const Client = require('./structures/Client');

/* Global Options */
let options = {
  prefix: '?'
}

const client = new Client(options);
client.run();

// Your BOT token obtained from 
// https://discordapp.com/developers/applications/
client.login('TOKEN');