const { Command } = require('discord-akairo');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info']
        });
    }

    async exec(message) {
        const embed = this.client.util
            .embed()
            .setColor(0x7289da)
            .setTitle('Information')
            .setDescription(`  •  Current Prefix: \`${message.guild.prefix}\`\n  •  **${this.client.commandHandler.modules.size}** commands loaded with ${this.client.commandHandler.aliases.size} aliases\n  •  Invite me to your server [here](https://discord.com/oauth2/authorize?client_id=${this.client.id}&scope=bot)`);
        
        return message.channel.send(embed);
    }
}

module.exports = InfoCommand;
