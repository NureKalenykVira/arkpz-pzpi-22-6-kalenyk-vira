const axios = require('axios');
const SensorManager = require('./sensors/sensorManager');
const { checkThresholds, formatData } = require('./utils/dataFormatter');

// Статичні дані для зон
const zones = [
    { id: 1, name: 'Zone A' },
    { id: 2, name: 'Zone B' },
];

// Ініціалізація SensorManager
const sensorManager = new SensorManager(zones);

// Функція для надсилання даних сенсорів
async function sendSensorData() {
    try {
        const sensorData = sensorManager.getSensorData();

        // Якщо даних немає, логування та завершення виконання
        if (!sensorData || sensorData.length === 0) {
            console.error('No sensor data generated.');
            return;
        }

        // Перебір даних сенсорів
        for (const data of sensorData) {
            console.log('Processing sensor data:', data); // Логування даних

            // Перевірка на аномалії
            const anomalies = checkThresholds(data, {
                maxTemperature: 8,
                minTemperature: 0,
                maxHumidity: 70,
                minHumidity: 30,
            });

            if (anomalies.length > 0) {
                console.error(`Anomalies detected in zone ${data.zoneId}:`, anomalies);

                // Надсилання аномалій
                try {
                    await axios.post('http://localhost:3000/sensors/anomalies', {
                        zoneId: data.zoneId,
                        anomalies,
                    }, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    console.log(`Anomalies reported for zone ${data.zoneId}:`, anomalies);
                } catch (error) {
                    console.error(`Failed to report anomalies for zone ${data.zoneId}:`, error.message);
                }
            }

            // Форматування даних перед відправкою
            const formattedData = formatData(data);

            // Надсилання даних сенсора
            try {
                await axios.post('http://localhost:3000/sensors/data', formattedData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log(`Data sent for zone ${data.zoneId}:`, JSON.stringify(formattedData, null, 2));
            } catch (error) {
                console.error(`Failed to send data for zone ${data.zoneId}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error during sensor data processing:', error.message);
    }
}


setInterval(sendSensorData, 60000);