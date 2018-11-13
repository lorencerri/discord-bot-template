const Discord = require('discord.js');
const Hook = require('quick.hook');
const db = require('quick.db');

require('./CategoryChannel');
require('./Guild');
require('./GuildChannel');
require('./GuildMember');
require('./Message');
require('./Role');
require('./User');
require('./TextChannel');

class Base extends Discord.Client {
    constructor(...args) {
        super(...args);
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.CommandHandler = new (require('./CommandHandler'))(this);
        this.EventHandler = new (require('./EventHandler'))(this);
        this.hook = Hook;
        this.db = db;
        this.prefix = '!';
    }
    
    run() {
        this.CommandHandler.load();
        this.EventHandler.load();
    }
    
    get dateToHour() {
        let d = new Date();
        return new Date().toJSON().substring(0, 13);
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
}

module.exports = Base;