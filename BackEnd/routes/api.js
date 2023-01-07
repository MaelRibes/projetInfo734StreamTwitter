import express from "express";
import {
    createAccount,
    deleteAccount,
    getAccountData,
    logInAccount,
    signUpAccount,
    readAllAccounts,
    updateToken,
    getAllAccountTweets, deleteTweetIds,
} from "../controllers/accounts.js";
import {checkAccountNotAlreadyAuthenticated, isAccountAsking, isAccountAuthenticated, isSuperAccount} from "../middlewares/index.js";
import {deleteAllTweets, readAllTweets} from "../controllers/tweets.js";
import {getRules, addRule, deleteRule} from "../controllers/rules.js";

export const apiRouter = express.Router();
 apiRouter.post('/account', async (req, res) => {
    res.json(await createAccount(req.body));
});

 apiRouter.delete('/account/:accountId', async (req, res) => {
    res.json(await deleteAccount(req.params.accountId));
});

 apiRouter.get('/account/:accountId', async (req, res) => {
    res.json(await getAccountData(req.params.accountId));
});

apiRouter.get('/accountdata', isAccountAuthenticated, async (req, res) => {

    try {
        res.json(await getAccountData(req.session.accountId));
    } catch (e) {
        res.status(500).send(e.message)
    }
});

apiRouter.get('/authenticated', isAccountAuthenticated, async (req, res) => {

    res.json({
        isAccountLogged: true,
        isSuperAccount: req.session.isSuperAccount === true
    })
});

 apiRouter.get('/accounts', async (req, res) => {
    res.json(await readAllAccounts());
});

 apiRouter.get('/login', checkAccountNotAlreadyAuthenticated, async (req, res) => {

    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const result = await logInAccount(b64auth);
        req.session.accountId = result.accountId;
        req.session.pseudo = result.pseudo;
        req.session.isSuperAccount = result.isSuperAccount;
        res.json(result);
    }
    catch (e) {
        res.status(401).send(e.message);
    }
});

 apiRouter.delete('/logout', isAccountAuthenticated, async (req, res) => {

    try {
        req.session.destroy();
    } catch (e) {
    }
    res.clearCookie("connect.sid");

    res.end("La session a été détruite");
});

 apiRouter.post('/signup', async (req, res) => {

    try {
        res.json(await signUpAccount(req.body.auth.username, req.body.auth.password, req.body.isSuperAccount));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

apiRouter.put('/account/token', isAccountAuthenticated, async (req, res) => {
    try {
        res.json(await updateToken(req.session.accountId, req.body.token));
    }
    catch(e) {
        res.status(500).send(e.message);
    }
    
});

apiRouter.get("/rules", isAccountAuthenticated, async (req, res) => {
    try {
        res.json(await getRules(req.session.accountId));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

apiRouter.post("/rule", isAccountAuthenticated, async (req, res) => {
    try {
        res.json(await addRule(req.session.accountId, req.body.rule));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

apiRouter.delete("/rule/:ruleId", isAccountAuthenticated, async (req, res) => {
    try {
        res.json(await deleteRule(req.session.accountId, req.params.ruleId));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

apiRouter.get("/account-tweets", isAccountAuthenticated, async (req,res) => {
    try {
        res.json(await getAllAccountTweets(req.session.accountId));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

/*For test purposes*/
apiRouter.get("/tweets", async (req,res) => {
    try {
        res.json(await readAllTweets());
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

apiRouter.get("/delete-tweets/:accountId", async (req,res) => {
    try {
        res.json(await deleteTweetIds(req.params.accountId));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

apiRouter.get("/delete-db-tweets", async (req,res) => {
    try {
        res.json(await deleteAllTweets());
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})