const Discord = require('discord.js');
const fetch = require('node-fetch');
const Enmap = require('enmap');
const db = new Enmap({ name: 'data' });

require('./CategoryChannel');
require('./Guild');
require('./GuildChannel');
require('./GuildMember');
require('./Message');
require('./Role');
require('./User');
require('./TextChannel');

class Base extends Discord.Client {
    constructor(options, ...args) {
        super(...args);
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.CommandHandler = new (require('./CommandHandler'))(this);
        this.EventHandler = new (require('./EventHandler'))(this);
        this.db = db;
        this.prefix = options.prefix;
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
  
    hastebin(input, extension) {
      return new Promise(function (res, rej) {
          if (!input) rej("[Error] Missing Input");
          fetch.post("https://hasteb.in/documents").send(input).then(body => {
              res("https://hasteb.in/" + body.body.key + ((extension) ? "." + extension : ""));
          }).catch(e => rej(e));
      })
    }
    
}

module.exports = Base;