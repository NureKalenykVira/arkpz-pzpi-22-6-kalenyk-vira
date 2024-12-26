class TemperatureSensor {
    constructor(zoneId) {
        this.zoneId = zoneId;
    }

    generateData() {
        return parseFloat((Math.random() * (10 - (-5)) + (-5)).toFixed(2)); // від -5 до 10°C
    }
}

module.exports = TemperatureSensor;

class HumiditySensor {
    constructor(zoneId) {
        this.zoneId = zoneId;
    }

    generateData() {
        const humidity = parseFloat((Math.random() * (100 - 20) + 20).toFixed(2));
        console.log(`Generated humidity for zone ${this.zoneId}:`, humidity);
        return humidity;
    }
}
