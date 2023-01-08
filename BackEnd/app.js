import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import mongoose from "mongoose";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import {apiRouter} from "./routes/api.js";
import {signUpAccount} from "./controllers/accounts.js";
import crypto from "crypto";
import {config} from "dotenv";
import {Server} from "socket.io";

/* ========== SERVER ========== */

config()
const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);
server.listen(3000);

server.on('listening', function () {
    console.log("Le serveur est allumé");
});

server.on('error', function (error) {
    console.error(error);
});

/* ========== MONGODB ========== */

const options = {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

const mongoDBHost = process.env.MONGO_HOST || "localhost";
mongoose.connect(`mongodb://${mongoDBHost}:27017/streamTwitterProject`, options, function (err) {
    if (err) {
        throw err;
    }
    console.log('Connexion à Mongodb réussie');
});

const passwordEncrypted = crypto.createHash('sha256').update("admin").digest("hex");
signUpAccount("admin", passwordEncrypted, true, process.env.TWITTER_TOKEN).then((result) => {
    console.log("Le compte admin a été créé: ", result);
}).catch((error) => {
    console.error(`Il y a eu une erreur lors de la création du compte admin: ${error}`);
});

/* ========== REDIS ========== */

const RedisStore = connectRedis(session)
const redisHost = process.env.REDIS_HOST || "localhost";
const redisClient = redis.createClient({
    host: redisHost,
    port: 6379
})

redisClient.on('error', (err) => {
    console.log("Impossible d'établir une connexion avec redis. " + err);
});

redisClient.on('connect', () => {
    console.log("Connexion à redis avec succès");
});

app.use(session({

    store: new RedisStore({client: redisClient}),
    secret: "I'm Secret!",
    domain: "localhost",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 86400000,
        domain: "localhost"
    },
}));

/* ========== SOCKET IO ========== */

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

    socket.on("disconnect", function () {
        console.log("User " + socket.id + " disconnected");
    });
});

/* ========== ROUTES ========== */
app.use('/api', apiRouter);