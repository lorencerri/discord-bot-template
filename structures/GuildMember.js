const { Structures } = require('discord.js');

Structures.extend('GuildMember', GuildMember => {
    class GuildMemberExt extends GuildMember {
        constructor(...args) {
            super(...args);
        }

        // Returns the user's balance, or zero
        // <Guild>.prefix
        get prefix() {
            return this.get('balance', 0);
        }

        // The following methods are all namespaced by Guild ID & Member ID.
        // Examples:
        // <GuildMember>.get('balance', 0);
        // <GuildMember>.set('balance', 500);
        get(key, fallback) {
            return (
                this.client.db.get(`${this.guild.id}_${this.id}_${key}`) ||
                fallback
            );
        }

        set(key, data) {
            return this.client.db.set(
                `${this.guild.id}_${this.id}_${key}`,
                data
            );
        }

        delete(key) {
            return this.client.db.delete(`${this.guild.id}_${this.id}_${key}`);
        }
    }

    return GuildMemberExt;
});
