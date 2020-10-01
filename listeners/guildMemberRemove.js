const { Listener } = require('discord-akairo');

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        console.log(
            `${member.user.tag} has been unbanned in ${member.guild.name}`
        );
    }
};
