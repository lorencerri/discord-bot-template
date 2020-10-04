const { Command } = require('discord-akairo');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info']
        });
    }

    async exec(message) {
        return message.channel.send(`From here you can\n  •  Invite me to your server [here](${this.client.urls.me})\n  •  Join my support server [here](${this.client.urls.server})\n  •  My documentation [here](${this.client.urls.github})`);
    }
}

module.exports = InfoCommand;
