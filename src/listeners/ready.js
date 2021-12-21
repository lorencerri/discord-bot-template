const { Listener } = require('@sapphire/framework');
const { name, version } = require('../../package.json');
const colors = require('colorette');

class ReadyEvent extends Listener {
    constructor(context, options) {
        super(context, { ...options, once: true });
    }

    async run() {
        // Name and version
        this.container.logger.info(
            colors.bold(
                `${colors.green(`${name}`)} ${colors.yellow(
                    `v${version}`
                )} ${colors.green('is now ready!')}`
            )
        );

        // Loaded stores
        this.container.logger.info(colors.bold(colors.green('Loaded:')));
        let stores = [...this.container.client.stores.values()]
            .sort((a, b) => b.size - a.size)
            .map(
                store =>
                    `${colors.blue(
                        `\t${store.size.toString().padEnd(3, ' ')}`
                    )} ${colors.gray(store.name)}`
            );
        this.container.logger.info(stores.join('\n'));
    }
}

module.exports = {
    ReadyEvent
};
