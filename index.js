const Client = require('./structures/Client');
const client = new Client();
client.run();

// Your BOT token obtained from 
// https://discordapp.com/developers/applications/
// can replace TOKEN below: 
client.login('TOKEN');