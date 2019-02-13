const Client = require('./structures/Client');

// ----- Options -----
// Feel free to change
// any of these values
let options = {
  prefix: '?'
}

const client = new Client(options);
client.run();

// Your BOT token obtained from 
// https://discordapp.com/developers/applications/
// can replace TOKEN below: 
client.login('TOKEN');