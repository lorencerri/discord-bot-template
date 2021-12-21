const { cleanEnv, str } = require('envalid');

const env = cleanEnv(process.env, {
    DISCORD_BOT_TOKEN: str({
        desc: 'The Discord bot token (https://discord.com/developers/applications)'
    }),
    OWNER_ID: str({
        desc: "The ID of the bot's owner (used for eval & reload)"
    })
});

module.exports = { env };
