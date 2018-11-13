const Command = require('../../structures/Command');
const icons = require('../../res/icons.json');
const { MessageEmbed } = require('discord.js');

class Config extends Command {
    constructor(client) {
        super({
            name: 'config'
        });

        this.client = client;
    }

    exec(message, args) {

        // Create Embed
        const embed = new MessageEmbed();

        // Check for administrator perms
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            embed.setFooter('Sorry, this requires the administrator permission.').setColor(icons.invalidPermissionsColor).setTitle('Configuration');
            return message.channel.hook(embed, {
                name: 'Invalid Permissions',
                icon: icons.invalidPermissions
            });
        }

        // Fetch Config
        let config = {
            messageLogs: {
                name: 'Message Logs',
                args: '[ #channel | none ]',
                value: message.guild.parseID(this.client.db.get(`config_${message.guild.id}.messageLogs`)).data || 'none'
            },
            modLogs: {
                name: 'Moderation Logs',
                args: '[ #channel | none ]',
                value: message.guild.parseID(this.client.db.get(`config_${message.guild.id}.modLogs`)).data || 'none'
            },
            moderatorRole: {
                name: 'Moderator Role',
                args: '[ roleName | none ]',
                value: message.guild.parseID(this.client.db.get(`config_${message.guild.id}.moderatorRole`)).data || 'none'
            },
            moderatorActionsPerHour: {
                name: 'Moderator Actions Per Hour',
                args: '[ number | none ]',
                value: this.client.db.get(`config_${message.guild.id}.moderatorActionsPerHour`) || 'none'
            }
        }

        // Update Color
        embed.setColor(icons.configIconColor);

        // Check for arguments - Display current values
        if (args.length == 0) {
            let output = '_ _\n';
            for (var i in config) {
                output += `__**${config[i].name}**__\n**\`${this.client.prefix}config ${i} ${config[i].args}\`**\n ➜ **Current:** ${config[i].value}\n\n`
            }
            embed.setDescription(output).setTitle(message.guild.name);
            return message.channel.hook(embed, {
                name: 'Current Configuration',
                icon: icons.configIcon
            });
        }
    
        let rolePerms;
    
        // Updating Values
        switch (args[0]) {
            case 'messageLogs':
                
                if (args[1].toLowerCase() === 'none') {
                    this.client.db.delete(`config_${message.guild.id}.messageLogs`);
                    return message.channel.hook(embed.setFooter('Successfully set the message logs channel to none.'), {
                        name: 'Configuration Updated',
                        icon: icons.configIcon
                    });
                }
                
                var channel = message.mentions.channels.first();
                if (!channel) return message.channel.hook(embed.setFooter('Please mention a channel or type none.'), {
                    name: 'Unknown Channel',
                    icon: icons.configIcon
                });
                
                this.client.db.set(`config_${message.guild.id}.messageLogs`, channel.id);
                message.channel.hook(embed.setFooter(`Successfully set the message logs channel to #${channel.name}`), {
                    name: 'Configuration Updated',
                    icon: icons.configIcon
                });
                
                break;
            case 'modLogs':
                
                if (args[1].toLowerCase() === 'none') {
                    this.client.db.delete(`config_${message.guild.id}.modLogs`);
                    return message.channel.hook(embed.setFooter('Successfully set the mod logs channel to none.'), {
                        name: 'Configuration Updated',
                        icon: icons.configIcon
                    });
                }
                
                var channel = message.mentions.channels.first();
                if (!channel) return message.channel.hook(embed.setFooter('Please mention a channel or type none.'), {
                    name: 'Unknown Channel',
                    icon: icons.configIcon
                });
                
                this.client.db.set(`config_${message.guild.id}.modLogs`, channel.id);
                message.channel.hook(embed.setFooter(`Successfully set the mod logs channel to #${channel.name}`), {
                    name: 'Configuration Updated',
                    icon: icons.configIcon
                });
                
                break;
            case 'moderatorRole':
                
                args.shift()
                embed.setColor(icons.roleIconColor);
                
                if (args.join(' ').trim().toLowerCase() === 'none') {
                    this.client.db.delete(`config_${message.guild.id}.moderatorRole`);
                    return message.channel.hook(embed.setFooter(`Successfully set the moderator role to none.`), {
                        name: 'Configuration Updated',
                        icon: icons.roleIcon
                    });
                }
                
                let role = message.guild.roles.find(r => r.name.trim() === args.join(' ').trim());
                
                if (!role) {
                    return message.channel.hook(embed.setFooter(`Sorry, a role with the name ${args.join(' ').trim()} could not be found.`), {
                        name: 'Invalid Role',
                        icon: icons.roleIcon
                    });
                }
                
                this.client.db.set(`config_${message.guild.id}.moderatorRole`, role.id);
                
                message.channel.hook(embed.setFooter(`Successfully set the moderator role to @${role.name}.`), {
                    name: 'Configuration Updated',
                    icon: icons.roleIcon
                })
                
                break;
            case 'moderatorActionsPerHour':
                
                embed.setColor(icons.timerIconColor);
                
                if (args.join(' ').trim().toLowerCase() === 'none') {
                    this.client.db.delete(`config_${message.guild.id}.moderatorActionsPerHour`);
                    return message.channel.hook(embed.setFooter(`Successfully set the moderator actions per hour to none.`), {
                        name: 'Configuration Updated',
                        icon: icons.timerIcon
                    });
                }
                
                if (isNaN(args[1])) {
                    this.client.db.delete(`config_${message.guild.id}.moderatorActionsPerHour`);
                    return message.channel.hook(embed.setFooter(`Sorry, please enter a valid number.`), {
                        name: 'Invalid Number',
                        icon: icons.timerIcon
                    });
                }
                
                this.client.db.set(`config_${message.guild.id}.moderatorActionsPerHour`, parseInt(args[1]));
                message.channel.hook(embed.setFooter(`Successfully set the moderator actions per hour to ${args[1]}.`), {
                    name: 'Configuration Updated',
                    icon: icons.timerIcon
                });
                
                break;
            default:

                return message.channel.hook(embed.setFooter('Sorry, I couldn\'t find that configuration.'), {
                    name: 'Unknown Configuration',
                    icon: icons.roleIcon
                });
                
        }

    }
    
    

}

module.exports = Config;