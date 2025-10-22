require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;



const { Client, GatewayIntentBits } = require('discord.js');
const { getLyrics } = require('genius-lyrics-api');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Command: soup!lyrics <song name>
  if (message.content.startsWith('soup!lyrics')) {
    const query = message.content.slice(11).trim();
    
    if (!query) {
      message.reply('Please provide a song name!');
      return;
    }

    // This is where you'll fetch lyrics
    await fetchLyrics(query, message);
  }
});

async function fetchLyrics(query, message) {
  // TODO: Implement lyrics fetching
  const [artist, title] = query.split('-');
  if(!artist || !title){
    message.reply('please provide the song in "Artist-Title" format!');
    return;
  }
  const options = {
	apiKey: 'GAPI',
	title: title.trim(),
	artist: artist.trim(),
	optimizeQuery: true
    };
    
    lyrics = getLyrics(options).then((lyrics) => console.log(lyrics));

    if(!lyrics){
        message.reply('Lyrics not found!');
    }else{
        message.reply(lyrics);
    }
    
}
app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(port, () => {
  console.log(`Keep-alive server running on port ${port}`);
});
client.login(process.env.BOTTOKEN);

