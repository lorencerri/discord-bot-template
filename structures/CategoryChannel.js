const { Structures } = require('discord.js');

Structures.extend('CategoryChannel', CategoryChannel => {
   class CategoryChannelExt extends CategoryChannel {
       constructor(...args) {
        super(...args);    
       }
       
   } 
   return CategoryChannelExt;
});