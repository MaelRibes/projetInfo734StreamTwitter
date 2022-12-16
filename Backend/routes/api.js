const express = require("express");
const {startRules} = require("../controllers/stream")


// On crée le router de l'api
const apiRouter = express.Router();

/**
 * Route ping
 */

apiRouter.get('/getrules', async (req, res) => {
    res.render("streamViewer");
});


// On exporte seulement le router
module.exports = apiRouter;