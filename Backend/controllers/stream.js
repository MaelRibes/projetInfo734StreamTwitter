const {ETwitterStreamEvent, TwitterApi} = require('twitter-api-v2');
const {Server} = require("socket.io");

let io;

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

        const stream = await startRules2()

        socket.on("disconnect", () => {
            stream.destroy()
        })
    })
}

async function startRules2() {

    const client = new TwitterApi(`${process.env.TWITTER_TOKEN}`);

    const rules = await client.v2.streamRules();
    console.log(rules)

    if (rules.data?.length) {
        await client.v2.updateStreamRules({
            delete: {ids: rules.data.map(rule => rule.id)},
        });
    }
    console.log(rules)

    const stream = client.v2.searchStream({autoConnect: false});
    await client.v2.updateStreamRules({
        add: [{value: 'Maroc', tag: 'js'}, {value: 'NodeJS', tag: 'nodejs'}],
    });

    stream.on(ETwitterStreamEvent.Data, (data) => {
        io.emit('twitter', data)
    });
    stream.on(ETwitterStreamEvent.Connected, () => console.log('Stream is started.'));
    await stream.connect({autoReconnect: true, autoReconnectRetries: Infinity});

    return stream;
}

module.exports = {
    startRules: startRules2,
    stratSocket
}
