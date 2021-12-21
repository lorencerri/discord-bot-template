const { Command, RegisterBehavior } = require('@sapphire/framework');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection } = require('discord.js');

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

        switch (type) {
            case 'piece':
                const pieces = new Collection().concat(
                    ...this.container.stores.values()
                );
                const piece = pieces.get(name);
                await piece.reload();
                break;
            case 'store':
                const store = this.container.stores.get(name);
                await store.loadAll();
                break;
            default:
                await Promise.all(
                    this.container.stores.map(store => store.loadAll())
                );
        }

        interaction.reply('Reloaded!');
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

    // TODO: Verify this is working properly
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
