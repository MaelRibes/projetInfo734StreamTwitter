const express = require("express");
const {startStream} = require("../controllers/stream")


// On crée le router de l'api
const apiRouter = express.Router();

/**
 * Route ping
 */

apiRouter.get('/getrules', async (req, res) => {
    res.render("streamViewer");
});

apiRouter.get('/postrules/:value', async (req, res) => {
   await startStream({value : req.params.value})
    res.render("streamViewer");
});

// On exporte seulement le router
module.exports = apiRouter;