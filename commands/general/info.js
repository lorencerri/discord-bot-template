const { Command } = require('discord-akairo');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'stats']
        });
    }

    async exec(message) {
        const lines = [
            `Current Prefix: \`${message.guild.prefix}\``,
            `Commands Loaded: \`${this.client.commandHandler.modules.size}\``,
            `Command Aliases: \`${this.client.commandHandler.aliases.size}\``,
            `Guilds: \`${this.client.guilds.cache.size}\``,
            `Users: \`${this.client.guilds.cache.reduce((c, v) => c + v.memberCount, 0)}\``,
            `Server Invite: [Link](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot)`
        ]
        
        const embed = this.client.util
            .embed()
            .setColor(0x7289da)
            .setTitle('Information')
            .setDescription(`  •  ${lines.join('\n  •  ')}`);
        
        return message.channel.send(embed);
    }
}

module.exports = InfoCommand;
