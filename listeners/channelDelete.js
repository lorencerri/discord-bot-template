const { Listener } = require('discord-akairo');

module.exports = class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    async exec(channel) {
        console.log(
            `The channel ${channel.name} has been deleted in ${channel.guild.name}`
        );
    }
};
