const { cleanEnv, str } = require('envalid');

const env = cleanEnv(process.env, {
    DISCORD_BOT_TOKEN: str({
        desc: 'The Discord bot token (https://discord.com/developers/applications)'
    })
});

module.exports = { env };
