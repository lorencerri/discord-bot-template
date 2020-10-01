const { Listener } = require('discord-akairo');

module.exports = class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    async exec(guild, user) {
        console.log(`${user.tag} has been banned in ${guild.name}`);
    }
};
