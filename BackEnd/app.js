// On importe les packages
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import mongoose from "mongoose";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

// On importe les fichiers avec les routes
import {apiRouter} from "./routes/api.js";
import {readAllAccounts, signUpAccount, addTweet} from "./controllers/accounts.js";
import crypto from "crypto";
import {ETwitterStreamEvent, TwitterApi} from "twitter-api-v2";
import {config} from "dotenv";
import {Server} from "socket.io";
import {createTweet} from "./controllers/tweets.js";
import {streams} from "./controllers/streams.js";


/* ========== PARTIE SERVEUR ========== */

// On récupère les variables d'environnement
config()

// On crée l'application express
const app = express();

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

/* ========== PARTIE MONGODB ========== */

// Les options à donner à MongoDB
const options = {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

// L'host, c'est-à-dire l'adresse d'où se trouve la base MongoDB
// La notation a = b || c en JS veut dire, j'affecte à a la valeur de b si elle existe (non chaine de caractère vide, non null et non undefined), sinon je prends la valeur c
// Il faut lire ça: mongoDBHost est la variable d'environnement MONGO_HOST si elle est définie sinon c'est "localhost"
const mongoDBHost = process.env.MONGO_HOST || "localhost";

/*
Connexion à Mongodb avec les options définies auparavant
- mongodb : est le protocol que MongoDB utilise pour se connecter, comme http ou ssh par exemple (ne bouge jamais)
- mongoDBHost : est l'adresse locale d'où se trouve la base de données (localhost), et si la variable d'environnement MONGO_HOST existe et n'est pas vide alors on prendra cette valeur la => utilisé pour docker
- 27017 : est le port où MongoDB écoute (c'est le port par défaut)
- streamTwitterProject : est le nom de la base de données, il peut être ce que vous voulez
 */
mongoose.connect(`mongodb://${mongoDBHost}:27017/streamTwitterProject`, options, function (err) {
    if (err) {
        throw err;
    }
    console.log('Connexion à Mongodb réussie');
});

// On va créer un utilisateur admin avec lequel on se connectera pour créer d'autres utilisateurs. Son mot de passe sera admin et son pseudo sera aussi admin
const passwordEncrypted = crypto.createHash('sha256').update("admin").digest("hex");
signUpAccount("admin", passwordEncrypted, true, process.env.TWITTER_TOKEN).then((result) => {
    console.log("Le compte admin a été créé: ", result);
}).catch((error) => {
    console.error(`Il y a eu une erreur lors de la création du compte admin: ${error}`);
});

/* ========== PARTIE REDIS ========== */

// On crée l'object qui nous permettra de gérer les sessions avec Redis
const RedisStore = connectRedis(session)

// L'host, c'est-à-dire l'adresse d'où se trouve la base Redis
// La notation a = b || c en JS veut dire, j'affecte à a la valeur de b si elle existe (non chaine de caractère vide, non null et non undefined), sinon je prends la valeur c
// Il faut lire ça: redisHost est la variable d'environnement REDIS_HOST si elle est définie sinon c'est "localhost"
const redisHost = process.env.REDIS_HOST || "localhost";

// On configure le client Redis
const redisClient = redis.createClient({

    // L'adresse où se trouve la base de données Redis
    host: redisHost,

    // Le port de la base de données
    port: 6379
})

// S'il y a une erreur on veut dire laquelle
redisClient.on('error', (err) => {
    console.log("Impossible d'établir une connexion avec redis. " + err);
});

// Si la connection est un succès, on veut le dire
redisClient.on('connect', () => {
    console.log("Connexion à redis avec succès");
});

// On configure le middleware de session, ce qui servira pour ajouter un object session qui sera disponible à chaque requête
app.use(session({

    // On utilise redis pour stocker les sessions utilisateur
    store: new RedisStore({client: redisClient}),

    // C'est ce qui permet d'encoder et décoder les sessions pour des raisons de sécurité évidentes (il doit être méconnu de tous pour ne pas se faire pirater)
    secret: "JeSuisSecret!",

    // Le domain (le début de l'URL) sur lequel la session doit être active, si votre site est https://test.com
    // le domaine sera "test.com" mais comme on fait du devloppement en local, ici il le domain est "localhost"
    domain: "localhost",

    // Quelques autres options
    resave: false,
    saveUninitialized: false,
    proxy: true,

    // Le cookie qui servira à stocker la session
    cookie: {

        // Si vrai, ne transmettre le cookie que par https.
        // On est en développement donc juste en http, on doit donc mettre false
        secure: false,

        // Si vrai, empêche le JS côté client de lire le cookie
        // Comme on est en développement, on peut le mettre à false, mais en production il doit être à true
        httpOnly: false,

        // La durée de vie de la session en millisecondes, après ce délai la session sera détruite, il faudra par exemple se reconnecter pour se recréer une session
        maxAge: 86400000, // 86400000ms = 1 jour

        // On laisse le même domaine que dans les options plus haut
        domain: "localhost"
    },
}));

/* ========== PARTIE SOCKET IO ========== */

export const io = new Server(server, {

    cors: {
        origin: (requestOrigin, callback) => {
            callback(undefined, requestOrigin);
        },
        methods: ["GET", "POST"],
    },
});

io.on("connection", async (socket) => {

    console.log("New user connected " + socket.id);

    socket.on("start", async (id) => {
        try {
            streams[id]["stream"].connect({autoReconnect: true, autoReconnectRetries: Infinity});
        } catch (e) {
            console.log(e)
        }
    });

    socket.on("stop", (id) => {
        try {
            streams[id]["stream"].close();
        }
        catch (e) {
            console.log(e)
        }
    });

    socket.on("disconnect", function () {
        console.log("User " + socket.id + " disconnected");
    });
});

/* ========== DECLARATION DES ROUTES ========== */

// On déclare que la route de base '/' sera utilisé comme base pour les routes du fichier routes/api.js
app.use('/api', apiRouter);