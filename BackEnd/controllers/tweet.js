import {Tweet} from "../models/index.js";
import {isObjectIdStringValid} from "../utils.js";

export async function createTweet(tweet) {
    try {
        const tweetToCreate = new Tweet({data: tweet.data, matching_rules : tweet.matching_rules});
        return await tweetToCreate.save();
    }
    catch (e) {
        console.log(e);
        //return "Une erreur s'est produite lors de la création du tweet";
    }
}

export const getTweet = async (tweetId) => {
    if (tweetId === undefined || !isObjectIdStringValid(tweetId)) {
        throw new Error("L'id de l'utilisateur est invalide ou non défini");
    }
    let tweetFound = await Tweet.findById(tweetId)
    return tweetFound;
}

export const readAllTweets = async () => {
    try {
        return await Tweet.find({});
    }
    catch (e) {
        return "Il y a une erreur lors de la récupération des tweets";
    }
}

