const express = require("express");
const {createAccount, readAllAccount} = require("../controllers/users.js")
const {printSession} = require("../middlewares/index.js");

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
 * Renvoie ce qui se trouve dans la session
 */
 apiRouter.get('/session', (req, res) => {
    res.json(req.session);
});

/**
 * Détruis la session
 */
 apiRouter.delete('/session', (req, res) => {

    // S'il n'y a pas de session, on renvoie un message
    if (req.session === undefined) {
        res.json("Il n'y a pas de session à détuire")
    }

    // Si elle est existe alors on peut la détruire
    else {
        req.session.destroy()
        res.json("La session a été détruite !");
    }
});

/**
 * Créer un utilisateur
 */
 apiRouter.get('/account', async (req, res) => {
    res.json(await readAllAccount());
});


/**
 * Créer un utilisateur
 */
 apiRouter.post('/account', async (req, res) => {
    res.json(await createAccount(req.body));
});

// On exporte seulement le router
module.exports = apiRouter;