exports.run = (client, message) => {
    
    // Check for prefix
    if (!message.content.startsWith(client.prefix)) return;
    
    // Declare & Initialize Variables
    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    // Return Statements
    if (message.author.bot || !message.channel.guild || !message.guild) return;
    if (!client.commands.has(cmd)) return;
    
    // Run Command
    const command = client.commands.get(cmd);
    command.exec(message, args);
    
}