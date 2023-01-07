import {Account, Tweet} from "../models/index.js";
import {isObjectIdStringValid} from "../utils.js";

export async function createTweet(tweet) {
    try {
        const tweetToCreate = new Tweet({data: tweet.data, matching_rules : tweet.matching_rules});
        const id = tweetToCreate._id;
        await tweetToCreate.save();
        return id;
    }
    catch (e) {
        console.log(e);
        return "Une erreur s'est produite lors de la création du tweet";
    }
}

export async function addTweet(accountId, tweetId){
    if (accountId === undefined || !isObjectIdStringValid(accountId)) {
        throw new Error("L'id de l'utilisateur est invalide ou non défini");
    }
    let accountFound = await Account.findById(accountId);
    accountFound.tweets.push(tweetId);
    await accountFound.save();
    return tweetId;
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

export const deleteAllTweets = async () => {
    try {
        return await Tweet.deleteMany({});
    }
    catch (e) {
        return "Il y a une erreur lors de la suppression des tweets";
    }
}