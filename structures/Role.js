const { Structures } = require('discord.js');

Structures.extend('Role', Role => {
   class RoleExt extends Role {
       constructor(...args) {
           super(...args); 
       }
       
       get memberCount() {
           return this.members.size;
       }
       
        
       
   } 
   return RoleExt;
});