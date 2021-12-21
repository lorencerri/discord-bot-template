const { Command, RegisterBehavior } = require('@sapphire/framework');
const { Stopwatch } = require('@sapphire/stopwatch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection, MessageEmbed } = require('discord.js');

class ReloadCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'reload',
            description: 'Reloads a piece or a store',
            preconditions: ['OwnerOnly']
        });
    }

    async chatInputRun(interaction) {
        const type = interaction.options.getSubcommand(true);
        const name = interaction.options.getString('name');
        const timer = new Stopwatch().stop();

        const embed = new MessageEmbed()
            .setColor(0xfee75c)
            .setDescription(
                `Reloading ${
                    type !== 'all'
                        ? `**\`${type}: ${name}\`**`
                        : 'all pieces and stores'
                }, please wait...`
            );

        await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        switch (type) {
            case 'piece':
                const pieces = new Collection().concat(
                    ...this.container.stores.values()
                );
                const piece = pieces.get(name);
                timer.start();
                await piece.reload();
                break;
            case 'store':
                const store = this.container.stores.get(name);
                timer.start();
                await store.loadAll();
                break;
            default:
                timer.start();
                await Promise.all(
                    this.container.stores.map(store => store.loadAll())
                );
        }

        embed
            .setDescription(
                `Successfully reloaded ${
                    type !== 'all'
                        ? `**\`${type}: ${name}\`**`
                        : 'all pieces and stores'
                } in **\`${timer.stop().toString()}\`**`
            )
            .setColor(0x57f287);

        await interaction.editReply({ embeds: [embed] });
    }

    autocompleteRun(interaction) {
        const type = interaction.options.getSubcommand(true);
        const query = interaction.options.getFocused();

        const options =
            type === 'piece'
                ? new Collection()
                      .concat(...this.container.stores.values())
                      .filter(
                          piece => !piece.location.full.includes('node_modules')
                      )
                : this.container.stores;

        return interaction.respond(
            [...options.values()]
                .map(piece => ({
                    name: piece.name,
                    value: piece.name
                }))
                .filter(option => !query.trim() || option.name.includes(query))
        );
    }

    registerApplicationCommands(registry) {
        const command = new SlashCommandBuilder()
            .setName('reload')
            .setDescription(this.description)
            .addSubcommand(subcommand =>
                subcommand
                    .setName('piece')
                    .setDescription('Reload a piece of code')
                    .addStringOption(option =>
                        option
                            .setName('name')
                            .setDescription('The name of the piece to reload')
                            .setRequired(true)
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('store')
                    .setDescription('Reload a store')
                    .addStringOption(option =>
                        option
                            .setName('name')
                            .setDescription('The name of the store to reload')
                            .setRequired(true)
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('all')
                    .setDescription('Reload all pieces and stores')
            );

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: ['608178003393904650']
        });
    }
}

module.exports = {
    ReloadCommand
};
