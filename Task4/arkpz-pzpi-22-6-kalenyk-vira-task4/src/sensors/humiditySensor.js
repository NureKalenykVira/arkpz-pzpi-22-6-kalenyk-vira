class HumiditySensor {
    constructor(zoneId) {
        this.zoneId = zoneId;
    }

    generateData() {
        return parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)); // Від 20% до 100%
    }
}

module.exports = HumiditySensor;
