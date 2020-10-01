const { Listener } = require('discord-akairo');

module.exports = class RoleCreateListener extends Listener {
    constructor() {
        super('roleCreate', {
            emitter: 'client',
            event: 'roleCreate'
        });
    }

    async exec(role) {
        console.log(
            `The role ${role.name} has been created in ${role.guild.name}`
        );
    }
};
