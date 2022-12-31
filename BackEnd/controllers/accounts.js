const crypto = require("crypto");
const {getKeysNotProvided, isObjectIdStringValid} = require("../utils.js");
const {Account} = require("../models/index.js");
const { get } = require("http");

/**
 * Créer un utilisateur
 * @param account L'utilisateur à créer
 * @returns L'utilisateur crée
 */
 async function createAccount(account) {
        // On regarde déjà si tous les champs de l'utilisateur sont présents
        const neededKeys = ["pseudo", "password"];
        const keysNotGiven = getKeysNotProvided(neededKeys, account);
    
        // Si une ou plusieurs clefs ne sont pas données alors on renvoie un message d'erreur
        if (keysNotGiven.length !== 0) {
            return `Les informations suivantes ne sont pas fournies ou vides: '${keysNotGiven.join(', ')}'`;
        }
    
        // On peut essayer de créer l'utilisateur
        try {
    
            // On crée un utilisateur avec le model de MongoDB et les informations de l'utilisateur
            const accountToCreate = new Account(account);

            // Puis on le sauvegarde en n'oubliant pas le mot clef await qui va nous permettre d'attendre que l'utilisateur
            // soit sauvegarder pour nous le renvoyer
            return await accountToCreate.save();
        }
    
            // S'il y a une erreur lors du processus alors on renvoie un message d'erreur
        catch (e) {
            return "Une erreur s'est produite lors de la création de l'utilisateur";
        }

}

/**
 * Supprime un utilisateur
 * @param accountId L'identifiant de l'utilisateur à supprimer
 * @returns L'utilisateur qui vient d'être supprimé
 */

 async function deleteAccount(accountId) {

    // Vérifier si l'accountId existe et est un id MongoBD valide
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        return "L'id de l'utilisateur n'existe pas ou n'est pas un id MongoDB"
    }
    // On demande à MongoDB de supprimer le compte qui a comme identifiant unique MongoDB 'accountId'
    const accountDeleted = await Account.findByIdAndDelete(accountId);
    // Si le compte trouvé est null c'est qu'il n'existe pas dans la base de données
    if (accountDeleted === null) {
        throw new Error("Le compte n'existe pas et n'a donc pas pû être supprimé");
    }
    // Sinon c'est qu'il existe et on le renvoie
    return accountDeleted;

}

/**
 * Récupère la donnée de l'utilisateur (son compte + l'utilisateur en lui-même) (sauf le mot de passe)
 * @param userId L'id de l'utilisateur que l'on veut récupérer
 */
 const getAccountData = async (accountId) => {

    // Vérifier si l'userId existe et est valide
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur est invalide ou non défini");
    }

    let accountFound = await Account.findById(accountId) 

    // On renvoie la donnée
    return accountFound;
}

/**
 * Récupère TOUS les utilisateurs depuis la base de données
 */
 async function readAllAccounts() {

    // On essaye de récupérer TOUS les utilisateurs (donc on ne met pas de conditions lors de la recherche, juste un object vide)
    try {
        return await Account.find({})
    }

        // S'il y a une erreur, on renvoie un message
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des utilisateurs";
    }
}

/**
 * Créer un nouveau compte
 * @param pseudo Le pseudo avec lequel le compte doit être créé
 * @param password Le mot de passe du compte
 * @param isSuperAccount Si l'utilisateur est un "super utilisateur" (un admin)
 */
 const signUpAccount = async (pseudo, password, isSuperAccount, token) => {

    // On fait des tests...
    if (pseudo === undefined || pseudo === "") {
        throw new Error("Le pseudo doit être défini et non vide pour créer un compte");
    }

    if (password === undefined || password === "") {
        throw new Error("Le mot de passe doit être défini et non vide pour créer un compte");
    }

    if (isSuperAccount === undefined) {
        isSuperAccount = false;
    }

    // On regarde déjà si un compte n'existe pas à ce pseudo (pour ne pas en recréer un)
    const alreadyExistingAccount = await Account.findOne({pseudo: pseudo});
    if (alreadyExistingAccount !== null) {
        throw new Error("Un compte existe déjà avec ce pseudo");
    }

    // On utilise le sha256 pour sécuriser le mot de passe dans la base de données
    const passwordEncrypted = crypto.createHash('sha256').update(password).digest("hex");

    // On va créer le compte 
    const newAccount = new Account({
        pseudo: pseudo.toLowerCase(),
        password: passwordEncrypted,
        isSuperAccount: isSuperAccount,
        token: token
    });

    // On essaye de créer le compte, on veut faire un try/catch, car si ça ne marche pas on veut supprimer l'utilisateur associé, car il ne pourra pas être lié à un compte
    try {
        const accountCreated = await newAccount.save();

        // On veut retourner l'id du compte créé
        return accountCreated._id;
    } catch (e) {

        // On veut supprimer l'utilisateur
        await deleteAccount(accountCreated._id);

        // Et on throw l'erreur qu'on a catch
        throw e;
    }    
}

/**
 * On essaye de connecter l'utilisateur
 * @param headerAuthorization Le header authorization
 */
 const logInAccount = async (headerAuthorization) => {

    // On récupère le mot de passe et le pseudo du header authorization
    let [pseudo, password] = Buffer.from(headerAuthorization, 'base64').toString().split(':');

    // On hash le mot de passe avec l'algorithme SHA256 et on veut le résultat en hexadecimal
    let passwordToCheck = crypto.createHash('sha256').update(password).digest("hex");

    // On cherche le compte qui a ce pseudo avec le mot de passe.
let accountFound = await Account.findOne({pseudo: pseudo.toLowerCase(), password: passwordToCheck});

    // Si le compte existe alors on renvoie ses données
    if (accountFound !== null) {
        return {
            accountId: accountFound._id,
            pseudo: accountFound.pseudo,
            isSuperAccount: accountFound.isSuperAccount,
            token : accountFound.token
        }
    }

    // Sinon on veut renvoyer une erreur
    throw new Error("Aucun compte n'a été trouvé avec ces identifiants");
}

/**
 * Modifier le token
 */
async function updateToken(accountId, token) {
    if (token === ""){
        throw new Error("Veuillez renseigner un token")
    }

    const accountUpdated = await Account.findByIdAndUpdate(accountId, {"token" : token}, {new: true});

    return accountUpdated;
}

async function deleteAllAccounts() {
    const accounts = await readAllAccounts();
    for(let i in accounts){
        await deleteAccount(accounts[i]._id);
    }
}

// On exporte les modules
module.exports = {
    createAccount: createAccount,
    deleteAccount: deleteAccount,
    getAccountData : getAccountData,
    signUpAccount : signUpAccount,
    logInAccount : logInAccount,
    readAllAccounts: readAllAccounts,
    updateToken : updateToken,
    deleteAllAccounts : deleteAllAccounts
}