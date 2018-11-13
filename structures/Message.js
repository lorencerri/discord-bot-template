const { Structures } = require('discord.js');

Structures.extend('Message', Message => {
   class MessageExt extends Message {
       constructor(...args) {
        super(...args);    
       }
       
       /* Returns the pinged user, if none, returns the author. */
       get actionTarget() {
           let mentioned = this.mentions.users.first();
           if (mentioned) return mentioned;
           else return this.author;
       }
       
   } 
   return MessageExt;
});