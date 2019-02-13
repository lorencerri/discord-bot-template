const Command = require('../../structures/Command');
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
            .setColor(0xffffff)
            .setFooter(`Pong! API: ${Math.floor(this.client.ping)}`);

        return message.channel.send(embed);
        
    }
    
}

module.exports = Ping;