const TemperatureSensor = require('./temperatureSensor');
const HumiditySensor = require('./humiditySensor');
const RfidSensor = require('./rfidSensor');

class SensorManager {
    constructor(refrigerators) {
        console.log('Initializing SensorManager with refrigerators:', refrigerators);
        this.refrigerators = refrigerators.map(fridge => ({
            id: fridge.id,
            name: fridge.name,
            zones: fridge.zones.map(zone => ({
                id: zone.id,
                name: zone.name,
                temperatureSensor: new TemperatureSensor(zone.id),
                humiditySensor: new HumiditySensor(zone.id),
                rfidSensor: new RfidSensor(zone.id),
            })),
        }));
    }

    getSensorData() {
        const data = [];
        console.log('Processing sensor data for refrigerators:', this.refrigerators);

        this.refrigerators.forEach(fridge => {
            if (!fridge.zones || fridge.zones.length === 0) {
                console.warn(`Refrigerator ${fridge.id} (${fridge.name}) does not have any zones.`);
                return;
            }

            fridge.zones.forEach(zone => {
                const temperatureData = zone.temperatureSensor.generateData();
                const humidityData = zone.humiditySensor.generateData();

                const complianceCoefficient = this.calculateComplianceCoefficient({
                    temperature: temperatureData,
                    humidity: humidityData,
                });

                data.push({
                    refrigeratorId: fridge.id,
                    refrigeratorName: fridge.name,
                    zoneId: zone.id,
                    zoneName: zone.name,
                    temperature: temperatureData,
                    humidity: humidityData,
                    complianceCoefficient,
                    rfid: zone.rfidSensor.generateData(),
                });
            });
        });

        return data;
    }

    calculateComplianceCoefficient(sensorData) {
        const thresholds = {
            maxTemperature: 8,
            minTemperature: 0,
            maxHumidity: 70,
            minHumidity: 30,
        };

        let inCompliance = 0;
        const totalSensors = 2;

        if (
            sensorData.temperature >= thresholds.minTemperature &&
            sensorData.temperature <= thresholds.maxTemperature
        ) {
            inCompliance++;
        }

        if (
            sensorData.humidity >= thresholds.minHumidity &&
            sensorData.humidity <= thresholds.maxHumidity
        ) {
            inCompliance++;
        }

        return (inCompliance / totalSensors).toFixed(2);
    }
}

module.exports = SensorManager;