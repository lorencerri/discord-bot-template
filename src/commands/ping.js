const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'ping',
            aliases: ['pong'],
            description: 'Returns the ping and latency for the bot',
            chatInputCommand: {
                register: true,
                behaviorWhenNotIdentical: 'OVERWRITE',
                guildIds: ['343572980351107077'],
                idHints: ['922718648500617228']
            }
        });
    }

    async chatInputRun(interaction) {
        const embed = new MessageEmbed()
            .setColor(0xfee75c)
            .setTitle('Ping?')
            .setDescription('Please wait...');

        const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        const ping = interaction.client.ws.ping;
        const latency = message.createdTimestamp - Date.now();

        embed
            .setColor(0x57f287)
            .setTitle('Pong!')
            .setDescription(`Ping: ${ping}ms\nLatency: ${latency}ms`);

        await interaction.editReply({ embeds: [embed] });
    }
}

module.exports = {
    PingCommand
};
