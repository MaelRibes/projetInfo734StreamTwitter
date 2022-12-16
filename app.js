// On importe les packages
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const {Server} = require("socket.io");

// On importe les fichiers avec les routes
const apiRouter = require("./Backend/routes/api.js");
const {stratSocket} = require("./Backend/controllers/stream");

require('dotenv').config()


/* ========== PARTIE SERVEUR ========== */

// On crée l'application express
const app = express();
app.set('view engine', 'ejs');


// On configure le server
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Crée un serveur HTTP
const server = http.createServer(app);

// On allume le serveur au port 3000
server.listen(3000);

// Quand le serveur est allumé on le log
server.on('listening', function () {
    console.log("Le serveur est allumé");
});

// Si il y a une erreur on la log
server.on('error', function (error) {
    console.error(error);
});




/* ========== DECLARATION DES ROUTES ========== */

// On déclare que la route de base '/api' sera utilisé comme base pour les routes du fichier routes/api.js
app.use('/', apiRouter);

stratSocket(server)

module.exports = {
    server
}