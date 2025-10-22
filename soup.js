require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Command: soup!lyrics <song name>
  if (message.content.startsWith("soup!lyrics")) {
    const query = message.content.slice(11).trim();

    if (!query) {
      message.reply("Please provide a song name!");
      return;
    }

    // This is where you'll fetch lyrics
    await fetchLyrics(query, message);
  }
});

async function fetchLyrics(query, message) {
  // TODO: Implement lyrics fetching
  const [artist, title] = query.split("-");
  if (!artist || !title) {
    message.reply('please provide the song in "Artist-Title" format!');
    return;
  }
  //fetching the lyrics

  fetch(
    `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Lyrics not found");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      message.reply(data.lyrics);
    })
    .catch((err) => {
      message.reply("Lyrics not found!");
    });
}

client.login(process.env.BOTTOKEN);
