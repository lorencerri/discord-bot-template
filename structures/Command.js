class Command {
  constructor(options) {
    this.name = options.name;
    this.category = options.category || 'General';
    this.aliases = options.aliases || [];
    this.description = options.description || 'None';
    this.permLevel = options.permLevel || 0;
    this.cooldown = options.cooldown || 0;
    this.requiredPerms = options.requiredPerms || [];
  }
}

module.exports = Command;
