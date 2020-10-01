module.exports = class Utils {
    constructor(client) {
        this.client = client;
    }

    // <Client>.Utils.multiplyByFour(<Number>);
    multiplyByFour(x) {
        return x * 4;
    }

    // <Client>.Utils.staticObject;
    get staticObject() {
        return {
            Hello: 'World',
            One: 2
        };
    }
};
