import crypto from "crypto";
import {getKeysNotProvided, isObjectIdStringValid} from "../utils.js";
import {Account, Tweet} from "../models/index.js";

export async function createAccount(account) {

        const neededKeys = ["pseudo", "password"];
        const keysNotGiven = getKeysNotProvided(neededKeys, account);

        if (keysNotGiven.length !== 0) {
            return `Les informations suivantes ne sont pas fournies ou vides: '${keysNotGiven.join(', ')}'`;
        }

        try {
            const accountToCreate = new Account(account);
            return await accountToCreate.save();
        }
        catch (e) {
            return "Une erreur s'est produite lors de la création de l'utilisateur";
        }
}

 export async function deleteAccount(accountId) {

    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        return "L'id de l'utilisateur n'existe pas ou n'est pas un id MongoDB"
    }

    const accountDeleted = await Account.findByIdAndDelete(accountId);

    if (accountDeleted === null) {
        throw new Error("Le compte n'existe pas et n'a donc pas pû être supprimé");
    }

    return accountDeleted;

}

 export const getAccountData = async (accountId) => {

    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur est invalide ou non défini");
    }

    let accountFound = await Account.findById(accountId) 

    return accountFound;
}

 export async function readAllAccounts() {

    try {
        return await Account.find({});
    }
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des utilisateurs";
    }
}

 export const signUpAccount = async (pseudo, password, isSuperAccount, token) => {

    if (pseudo === undefined || pseudo === "") {
        throw new Error("Le pseudo doit être défini et non vide pour créer un compte");
    }

    if (password === undefined || password === "") {
        throw new Error("Le mot de passe doit être défini et non vide pour créer un compte");
    }

    if (isSuperAccount === undefined) {
        isSuperAccount = false;
    }

    const alreadyExistingAccount = await Account.findOne({pseudo: pseudo});
    if (alreadyExistingAccount !== null) {
        throw new Error("Un compte existe déjà avec ce pseudo");
    }

    const passwordEncrypted = crypto.createHash('sha256').update(password).digest("hex");

    const newAccount = new Account({
        pseudo: pseudo.toLowerCase(),
        password: passwordEncrypted,
        isSuperAccount: isSuperAccount,
        token: token
    });

    try {
        const accountCreated = await newAccount.save();
        return accountCreated._id;
    } catch (e) {
        await deleteAccount(accountCreated._id);
        throw e;
    }    
}

 export const logInAccount = async (headerAuthorization) => {

    let [pseudo, password] = Buffer.from(headerAuthorization, 'base64').toString().split(':');
    let passwordToCheck = crypto.createHash('sha256').update(password).digest("hex");
    let accountFound = await Account.findOne({pseudo: pseudo.toLowerCase(), password: passwordToCheck});

    if (accountFound !== null) {
        return {
            accountId: accountFound._id,
            pseudo: accountFound.pseudo,
            isSuperAccount: accountFound.isSuperAccount,
            token : accountFound.token
        }
    }

    throw new Error("Aucun compte n'a été trouvé avec ces identifiants");
}

export async function updateToken(accountId, token) {
    if (token === ""){
        throw new Error("Veuillez renseigner un token")
    }

    try{
        return await Account.findByIdAndUpdate(accountId, {"token": token}, {new: true});
    }
    catch (e) {
        throw e;
    }
}

export async function getAllAccountTweets(accountId){
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur est invalide ou non défini");
    }
    let accountFound = await Account.findById(accountId);
    let tweetIds = accountFound.tweets;
    let res = [];
    for (const id of tweetIds) {
        res.push(await Tweet.findById(id));
    }
    return res;
}

export async function deleteTweetIds(accountId) {
    let accountFound = await Account.findById(accountId);
    accountFound.tweets = [];
    await accountFound.save();
    return accountFound.tweets;
}