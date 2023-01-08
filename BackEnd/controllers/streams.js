import {readAllAccounts} from "./accounts.js";
import {ETwitterStreamEvent, TwitterApi} from "twitter-api-v2";
import {createTweet, addTweet} from "./tweets.js";
import {io} from "../app.js";

export let streams = {};

export async function createStream(account){
    const client = new TwitterApi(account.token);
    let autoConnect = account.autoConnect;
    if(autoConnect === undefined) {autoConnect = false;}
    const stream = client.v2.searchStream({
        autoConnect: false,
        "tweet.fields": ['attachments', 'author_id', 'context_annotations', 'conversation_id', 'created_at', 'entities', 'geo', 'id', 'in_reply_to_user_id', 'lang', 'public_metrics', 'non_public_metrics', 'promoted_metrics', 'organic_metrics', 'edit_controls', 'possibly_sensitive', 'referenced_tweets', 'reply_settings', 'source', 'text', 'withheld'],
        "user.fields": ['created_at', 'description', 'entities', 'id', 'location', 'name', 'pinned_tweet_id', 'profile_image_url', 'protected', 'public_metrics', 'url', 'username', 'verified', 'withheld'],
        "place.fields": ['contained_within', 'country', 'country_code', 'full_name', 'geo', 'id', 'name', 'place_type'],
        expansions: ['attachments.poll_ids', 'attachments.media_keys', 'author_id', 'referenced_tweets.id', 'in_reply_to_user_id', 'edit_history_tweet_ids', 'geo.place_id', 'entities.mentions.username', 'referenced_tweets.id.author_id']
    });
    stream.on(ETwitterStreamEvent.Connected, () => {
        console.log("Stream started.");
        io.emit("connected", "Le stream a démarré");
    });

    stream.on(ETwitterStreamEvent.Reconnected, () => {
        console.log("Stream restarted.");
        io.emit("reconnected", "Le stream a redémarré");
    });

    stream.on(ETwitterStreamEvent.Data, async (tweet) => {
        io.emit('tweet', {
            id: tweet.data.id,
            author: `@${tweet.includes.users[0].username}`,
            text: tweet.data.text,
            rules: tweet.matching_rules
        });
        const tweetId = await createTweet(tweet);
        await addTweet(account._id, tweetId);
    });

    stream.on(ETwitterStreamEvent.ConnectionClosed, (data) => {
        console.log("Stream closed");
        io.emit("disconnected", "Le stream est maintenant déconnecté");
    })
    streams[account._id] = {
        "client": client,
        "stream": stream,
        "connected": autoConnect
    };
    if(autoConnect){streams[account._id]["stream"].connect()}
}
async function createStreams() {
    let accounts = await readAllAccounts();
    accounts.forEach(account => {createStream(account)})
}

(async () => {
    await createStreams();
})();

export function startStream(accountId){
    streams[accountId]["stream"].connect({autoReconnect: true, autoReconnectRetries: Infinity});
    streams[accountId]["connected"] = true;
    return "Le stream est connecté";
}

export function stopStream(accountId){
    streams[accountId]["stream"].close();
    streams[accountId]["connected"] = false;
    return "Le stream est maintenant déconnecté";
}

export function getStreamConnection(accountId){
    return streams[accountId]["connected"];
}
