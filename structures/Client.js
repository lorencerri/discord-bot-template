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

    hastebin(input, extension) {
      return new Promise(function (res, rej) {
          if (!input) rej("[Error] Missing Input");
          fetch("https://hasteb.in/documents", { method: 'POST', body: input })
              .then(res => res.json())
              .then(body => {
                  res("https://hasteb.in/" + body.key + ((extension) ? "." + extension : ""));
          }).catch(e => rej(e));
      })
    }
    
}

module.exports = Base;