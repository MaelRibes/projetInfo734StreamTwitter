const express = require("express");
const {createAccount, readAllAccounts, deleteAccount, logInAccount, getAccountData} = require("../controllers/accounts.js")
const {printSession, isAccountAuthenticated, checkAccountNotAlreadyAuthenticated, isSuperAccount, isAccountAsking} = require("../middlewares/index.js");

// On crée le router de l'api
const apiRouter = express.Router();

/**
 * Route ping
 */
apiRouter.get('/ping', printSession, function (req, res) {
    res.json({
        status: "OK",
        timestamp: (new Date()).getTime()
    });
});

/**
 * Créer un compte
 */
 apiRouter.post('/account', async (req, res) => {
    res.json(await createAccount(req.body));
});

/**
 * Supprimer un compte
 */
 apiRouter.delete('/account/:accountId', async (req, res) => {
    res.json(await deleteAccount(req.params.accountId));
});

/**
 * Récupèrer un compte
 */
 apiRouter.get('/account/:accountId', async (req, res) => {
    res.json(await getAccountData(req.params.accountId));
});

/**
 * Récupèrer tous les comptes
 */
 apiRouter.get('/accounts', async (req, res) => {
    res.json(await readAllAccounts());
});

/**
 * La route pour que l'utilisateur se connecte
 */

 apiRouter.get('/login', checkAccountNotAlreadyAuthenticated, async (req, res) => {

    try {
        // On récupère le login et le mot de passe du header
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';

        // On essaye de connecter l'utilisateur
        const result = await logInAccount(b64auth);

        // On veut stocker des informations dans la session
        req.session.accountId = result.accountId;
        req.session.email = result.email;
        req.session.isSuperAccount = result.isSuperAccount;

        // On renvoie le résultat
        res.json(result);
    }

        // Si on attrape une erreur, on renvoie un code HTTP disant que l'utilisateur n'a pas pu se connecter (Unauthorized)
    catch (e) {
        res.status(401).send(e.message);
    }
});

/**
 * on déconnecte l'utilisateur
 * @middleware isAccountAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 */
 apiRouter.delete('/logout', isAccountAuthenticated, async (req, res) => {

    // On détruit la session
    try {
        req.session.destroy();
    } catch (e) {
    }

    // On enlève le cookie (même si ça doit se faire tout seul, on sait jamais...)
    res.clearCookie("connect.sid");

    res.end("La session a été détruite");
});

/**
 * Permet de créer un compte utilisateur
 * @middleware isAccountAuthenticated: Seul un utilisateur connecté peut accéder à cet endpoint
 * @middleware isSuperAccount: Seul un super utilisateur a le droit d'accéder à cet endpoint
 */
 apiRouter.post('/signup', isAccountAuthenticated, isSuperAccount, async (req, res) => {

    // On fait un try catch pour intercepter une potentielle erreur
    try {
        res.json(await signUpAccount(req.body.pseudo, req.body.password, req.body.isSuperAccount));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// On exporte seulement le router
module.exports = apiRouter;