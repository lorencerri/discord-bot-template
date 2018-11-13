const Command = require('../../structures/Command');
const { pingIcon, pingIconColor } = require('../../res/icons.json');
const { MessageEmbed } = require('discord.js');

class Ping extends Command {
    constructor(client) {
        super({
            name: 'ping'
        });
        
        this.client = client;
    }
    
    exec(message) {
        
        const embed = new MessageEmbed()
            .setColor(pingIconColor)
            .setFooter(`Pong! API: ${Math.floor(this.client.ping)}`);

        return message.channel.hook(embed, {
            name: 'Ping 🏓',
            icon: pingIcon
        });
        
    }
    
}

module.exports = Ping;