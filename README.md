## discord-bot-template

_This is a WIP starter template for Discord bots built on **discord-akairo**._

[discord.gg/plexidev](https://discord.gg/plexidev)

## Database

**Quick.db** is installed by default with some example helper methods defined in `structures/Guild.js` & `structures/GuildMember.js`. If you would like to change it out with anotherdatabase, it is easy to do so.

View more information about **Quick.db** [here](https://quickdb.js.org)

More information on discord-akairo's database handling can be found [here](https://discord-akairo.github.io/#/docs/main/8.0.0/other/providers).

## Getting Started

Create a `.env` file & place your token under a property titled 'TOKEN' to run.

## Default Commands

Current commands of which are supported within this template: 
`Info`, `Eval`, `Ping`, `Prefix`

Ability to add more commands by following this basic template:
```
const { Command } = require('discord-akairo');

class COMMANDNAME extends Command {
    constructor() {
        super('COMMANDNAME', {
            aliases: ['COMMANDALIASES']
        });
    }

    async exec(message) {
        // Code
    }
}

module.exports = COMMANDNAME;
```

## Creating a Discord Bot

**To create a new Discord bot process:**
 
Visit Discords Developer Portal: https://discordapp.com/developers/applications/
Click "New Application", 
Enter in your applications name, 
Click on "Bot", 
Then make your application into a bot process.

This will allow you to obtain your Discord Bots Token.
