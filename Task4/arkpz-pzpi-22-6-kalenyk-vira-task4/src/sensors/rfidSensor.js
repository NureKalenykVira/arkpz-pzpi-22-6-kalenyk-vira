class RfidSensor {
    constructor(zoneId) {
        this.zoneId = zoneId;
    }

    generateData() {
        const rfid = Math.random().toString(36).substring(2, 15);
        return rfid; 
    }
}

module.exports = RfidSensor;
