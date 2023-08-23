require('dotenv').config();
const { Client } = require("discord.js-selfbot-v13");
const { Streamer, streamLivestreamVideo } = require('@dank074/discord-video-stream');

run();

async function run() {
    try {
        while (true) {
            const streamer = new Streamer(new Client());
            await streamer.client.login(process.env.TOKEN);

            await streamer.joinVoice("1140977343750479922", "1140977347047198908");

            const udp = await streamer.createStream();
            udp.mediaConnection.setSpeaking(true);
            udp.mediaConnection.setVideoStatus(true);
            const res = await streamLivestreamVideo("./temp.mp4", udp);
            console.log("Finished playing video " + res);
            udp.mediaConnection.setSpeaking(false);
            udp.mediaConnection.setVideoStatus(false);
        }
    } catch (e) {
        console.log(e);
    }
}