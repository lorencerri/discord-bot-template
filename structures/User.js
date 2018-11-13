const { Structures } = require('discord.js');

Structures.extend('User', User => {
    class UserExt extends User {
        constructor(...args) {
            super(...args);
        }

    }

    return UserExt;
});
