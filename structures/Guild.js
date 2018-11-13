const {
    Structures,
    MessageEmbed
} = require('discord.js');
const icons = require('../res/icons.json');

Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
        }

        get memberSize() {
            return this.memberCount.toLocaleString();
        }

        /* Parses a given ID */
        parseID(ID) {
            if (!ID) return { type: 'none', data: null };
            else if (this.channels.has(ID)) return { type: 'channel', data: this.channels.get(ID) };
            else if (this.members.has(ID)) return { type: 'member', data: this.members.get(ID) };
            else if (this.roles.has(ID)) return { type: 'role', data: this.roles.get(ID) };
            else return { type: 'none', data: null };
        }

    }
    return GuildExt;
});
