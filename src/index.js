const {Client, IntentsBitField} = require("discord.js");
const {Events} = require("discord.js");
const {CommandHandler} = require("djs-commander");
const {token} = require("../config.json");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags["Guilds"],
    IntentsBitField.Flags["GuildMembers"],
    IntentsBitField.Flags["GuildMessages"],
    IntentsBitField.Flags["MessageContent"],
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});
client.login(token);

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
});

module.exports = {client};
