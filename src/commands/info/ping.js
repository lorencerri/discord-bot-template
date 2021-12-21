const { MessageEmbed } = require('discord.js');
const { Command, RegisterBehavior } = require('@sapphire/framework');

class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'ping',
            description: 'Returns the ping and latency for the bot',
            chatInputCommand: {
                register: true,
                behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
                guildIds: [process.env.GUILD_ID],
                idHints: ['922718648500617228']
            }
        });
    }

    async chatInputRun(interaction) {
        const embed = new MessageEmbed()
            .setColor(0xfee75c)
            .setDescription('**Ping?** Please wait...');

        const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        const ping = interaction.client.ws.ping;
        const latency = message.createdTimestamp - Date.now();

        embed
            .setColor(0x57f287)
            .setDescription(`⏱️ Ping: ${ping}ms\n⌛ Latency: ${latency}ms`);

        await interaction.editReply({ embeds: [embed] });
    }
}

module.exports = {
    PingCommand
};
