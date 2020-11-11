const { Listener } = require('discord-akairo');

module.exports = class GuildBanRemoveListener extends Listener {
    constructor() {
        super('guildBanRemove', {
            emitter: 'client',
            event: 'guildBanRemove'
        });
    }

    async exec(guild, user) {
        console.log(`${user.tag} has been unbanned in ${guild.name}`);
    }
};
