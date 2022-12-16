const {ETwitterStreamEvent, TwitterApi} = require('twitter-api-v2');
const {Server} = require("socket.io");

let io;
let stream;


async function startStream(rulesValues) {
    rulesValues = [rulesValues]
    stream = await startRules2(rulesValues)
}

function stratSocket(server) {
    io = new Server(server, {
        cors: {

            origin: (requestOrigin, callback) => {
                callback(undefined, requestOrigin);
            },
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', async (socket) => {
        console.log("je suis la")
        socket.emit('twitter', "test")

        socket.on("disconnect", () => {
            if(stream !== undefined){
                stream.destroy()
            }
        })
    })
}

async function startRules2(rulesValues) {

    const client = new TwitterApi(`${process.env.TWITTER_TOKEN}`);

    const rules = await client.v2.streamRules();
    console.log(rules)

    if (rules.data?.length) {
        await client.v2.updateStreamRules({
            delete: {ids: rules.data.map(rule => rule.id)},
        });
    }
    console.log(rules)

    const stream = client.v2.searchStream({
        autoConnect: false,
        expansions: ['attachments.poll_ids' , 'attachments.media_keys' , 'author_id' , 'referenced_tweets.id' , 'in_reply_to_user_id' , 'edit_history_tweet_ids' , 'geo.place_id' , 'entities.mentions.username' , 'referenced_tweets.id.author_id'],
        "tweet.fields": ['attachments' , 'author_id' , 'context_annotations' , 'conversation_id' , 'created_at' , 'entities' , 'geo' , 'id' , 'in_reply_to_user_id' , 'lang' , 'public_metrics' , 'non_public_metrics' , 'promoted_metrics' , 'organic_metrics' , 'edit_controls' , 'possibly_sensitive' , 'referenced_tweets' , 'reply_settings' , 'source' , 'text' , 'withheld'],
        "user.fields": ['created_at' , 'description' , 'entities' , 'id' , 'location' , 'name' , 'pinned_tweet_id' , 'profile_image_url' , 'protected' , 'public_metrics' , 'url' , 'username' , 'verified' , 'withheld'],
        "place.fields": ['contained_within' , 'country' , 'country_code' , 'full_name' , 'geo' , 'id' , 'name' , 'place_type']
    });
    await client.v2.updateStreamRules({

        add: rulesValues,
    });

    stream.on(ETwitterStreamEvent.Data, (data) => {
        const isArt = data.data.text.slice(0, 2) === "RT"

        if (isArt) {
            return;
        }

        io.emit('twitter', data)
    });
    stream.on(ETwitterStreamEvent.Connected, () => console.log('Stream is started.'));
    await stream.connect({autoReconnect: true, autoReconnectRetries: Infinity});

    return stream;
}

module.exports = {
    startRules: startRules2,
    stratSocket,
    startStream
}
