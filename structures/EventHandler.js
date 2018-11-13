'use strict';

const { resolve } = require('path');
const walk = require('walk');

class EventHandler {
  constructor(client) {
    this.client = client;

  }

  async load() {
    const walker = walk.walk('./events');
    walker.on("file", (root, stats, next) => {
      if (!stats.name.endsWith('.js')) return;
      const Event = require(`${resolve(root)}/${stats.name}`);
      let name = stats.name.substring(0, stats.name.length - 3);
      this.client.on(name, (...args) => Event.run(this.client, ...args))
      console.log('Loaded Event: ' + name);
      next();
    });
  }

}

module.exports = EventHandler;