/**
 * On print dans la console ce qui se trouve dans la session de l'utilisateur
 */
 export async function printSession(req, res, next) {

    // On log la session (de manière formatée)
    console.table(req.session)

    // On utilise la fonction next pour passer au middleware d'après ou à la fonction du routeur
    next();
}

/**
 * On regarde si l'utilisateur est authentifié
 */
 export const isAccountAuthenticated = async (req, res, next) => {

    // On regarde juste si la session de l'utilisateur contient un accountId défini
    if (req.session.accountId !== undefined) {

        // On utilise la fonction next qui permet de dire que l'on veut passer au prochain middleware ou à la fonction du router
        next();
    } else {

        // On renvoie une erreur avec le code 401 (Unauthorized)
        return res.status(401).send("Vous n'êtes pas authentifié");
    }
}

/**
 * On regarde si l'utilisateur n'est pas déjà authentifié
 */
 export const checkAccountNotAlreadyAuthenticated = async (req, res, next) => {

    // On regarde juste si la session de l'utilisateur NE contient pas un accountId
    if (req.session.accountId === undefined) {

        // On utilise la fonction next qui permet de dire que l'on veut passer au prochain middleware ou à la fonction du router
        next();
    } else {

        // On renvoie une erreur avec le code 409 (Conflict)
        return res.status(409).send("Vous êtes déjà authentifié");
    }
}

/**
 * On regarde si l'utilisateur est un "super utilisateur"
 */
 export const isSuperAccount = async (req, res, next) => {

    // On regarde juste si la variable isSuperaccount est à true dans la session
    if (req.session.isSuperAccount === true) {

        // On utilise la fonction next qui permet de dire que l'on veut passer au prochain middleware ou à la fonction du router
        next();
    } else {

        // On renvoie une erreur avec le code 403 (Forbidden)
        return res.status(403).send("Vous n'êtes pas un super utilisateur");
    }
}

/**
 * On regarde si l'utilisateur qui demande la ressource a le même accountId que le paramètre "accountId" OU s'il est un "super utilisateur"
 */
 export const isAccountAsking = async (req, res, next) => {

    // On regarde juste si la variable isSuperaccount est à true dans la session
    if (req.session.isSuperAccount === true || req.session.accountId === req.params.accountId) {

        // On utilise la fonction next qui permet de dire que l'on veut passer au prochain middleware ou à la fonction du router
        next();
    } else {

        // On renvoie une erreur avec le code 403 (Forbidden)
        return res.status(403).send("Vous ne pouvez demander cette ressource que pour vous même");
    }
}