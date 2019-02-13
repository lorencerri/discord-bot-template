const { Structures } = require('discord.js');

Structures.extend('GuildChannel', GuildChannel => {
   class GuildChannelExt extends GuildChannel {
       constructor(...args) {
           super(...args);    
       }
        
   }
   return GuildChannelExt;
});