const {getKeysNotProvided, isObjectIdStringValid} = require("../utils.js");
const {Account} = require("../models/index.js")

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
 * Récupère TOUS les utilisateurs depuis la base de données
 */
 async function readAllAccount() {

    // On essaye de récupérer TOUS les utilisateurs (donc on ne met pas de conditions lors de la recherche, juste un object vide)
    try {
        return await Account.find({})
    }

        // S'il y a une erreur, on renvoie un message
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des utilisateurs";
    }
}


// On exporte les modules
module.exports = {
    createAccount: createAccount,
    readAllAccount: readAllAccount
}