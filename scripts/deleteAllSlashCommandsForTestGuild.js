// Sometimes Discord & your bot will get out of sync. Running this file will fix it in the dev guild.

require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = '922601783182909470'; // CHANGE THIS
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId)).then(data => {
    const promises = [];
    for (const command of data) {
        const deleteUrl = `${Routes.applicationGuildCommands(
            clientId,
            guildId
        )}/${command.id}`;
        promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
});
