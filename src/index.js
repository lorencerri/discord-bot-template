require('dotenv').config();
require('@sapphire/plugin-logger/register');

const { GatewayIntentBits } = require('discord-api-types/v9');
const { SapphireClient } = require('@sapphire/framework');
const { Constants } = require('discord.js');
const { env } = require('./config');
const colors = require('colorette');

const client = new SapphireClient({
    enableLoaderTraceLoggings: true,
    intents: GatewayIntentBits.Guilds,
    partials: [Constants.PartialTypes.CHANNEL],
    disableMentions: 'everyone'
});

(async () => {
    try {
        await client.login(env.DISCORD_BOT_TOKEN);
        client.logger.info(
            colors.bold(colors.green('Successfully logged in...'))
        );
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
})();
