 export const isAccountAuthenticated = async (req, res, next) => {

    if (req.session.accountId !== undefined) {
        next();
    } else {
        return res.status(401).send("Vous n'êtes pas authentifié");
    }
}

 export const checkAccountNotAlreadyAuthenticated = async (req, res, next) => {

    if (req.session.accountId === undefined) {
        next();
    } else {
        return res.status(409).send("Vous êtes déjà authentifié");
    }
}

 export const isSuperAccount = async (req, res, next) => {

    if (req.session.isSuperAccount === true) {
        next();
    } else {
        return res.status(403).send("Vous n'êtes pas un super utilisateur");
    }
}

 export const isAccountAsking = async (req, res, next) => {

    if (req.session.isSuperAccount === true || req.session.accountId === req.params.accountId) {
        next();
    } else {
        return res.status(403).send("Vous ne pouvez demander cette ressource que pour vous même");
    }
}