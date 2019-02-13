const { Structures } = require('discord.js');

Structures.extend('TextChannel', TextChannel => {
   class TextChannelExt extends TextChannel {
       constructor(...args) {
           super(...args);    
       }
       
       hook(message, args) {
           return this.guild.client.hook(this, message, args);
       }
       
   } 
   return TextChannelExt;
});