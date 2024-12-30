const axios = require('axios');
const API_URL = process.env.API_URL || 'http://localhost:3000';

(async () => {
    try {
        console.log('Checking API health...');
        const healthResponse = await axios.get(`${API_URL}/health`);
        console.log('API Health:', healthResponse.data);

        console.log('Fetching thresholds...');
        const thresholds = await axios.get(`${API_URL}/settings/thresholds`);
        console.log('Fetched thresholds:', thresholds.data);
    } catch (error) {
        console.error('Error connecting to API:', error.message);
    }
})();

const SensorManager = require('./sensors/sensorManager');
const { loadThresholds, loadInterval, loadZones } = require('./utils/settingsLoader');
const { checkThresholds, updateThresholds, refreshThresholds } = require('./utils/dataFormatter');

let sensorManager = null;
let thresholds = {};
let intervalFrequency = 6000;

async function initializeClient() {
    try {
        console.log('Loading thresholds...');
        thresholds = await loadThresholds();
        updateThresholds(thresholds);
        console.log('Loaded thresholds:', thresholds);

        console.log('Loading interval frequency...');
        const loadedInterval = await loadInterval();
        intervalFrequency = loadedInterval > 0 ? loadedInterval : 6000;

        console.log('Loading zones...');
        const zones = await loadZones();
        sensorManager = new SensorManager(zones);

        scheduleSensorDataSending();
    } catch (error) {
        console.error('Error during initialization:', error.message);
    }
}

// Функція передачі даних сенсорів
async function sendSensorData() {
    console.log('Starting sendSensorData function...');

    if (!sensorManager) {
        console.error('SensorManager is not initialized. Cannot send data.');
        return;
    }

    let currentThresholds;
    try {
        // Отримання актуальних порогових значень
        console.log('Fetching thresholds from server...');
        currentThresholds = await axios.get('http://localhost:3000/settings/thresholds');
        currentThresholds = currentThresholds.data; // Зберігаємо отримані значення
        console.log('Fetched thresholds:', currentThresholds);
    } catch (error) {
        console.error('Failed to fetch thresholds from server:', error.message);
        return; // Якщо порогові значення не вдалося отримати, припиняємо роботу
    }

    const sensorData = sensorManager.getSensorData();
    console.log('Generated sensor data:', sensorData);

    if (!sensorData || sensorData.length === 0) {
        console.warn('No sensor data to process.');
        return;
    }

    // Обробка даних
    for (const data of sensorData) {
        try {
            // Перевірка на аномалії з використанням отриманих порогових значень
            const anomalies = checkThresholds(data, currentThresholds);
            if (anomalies.length > 0) {
                console.warn(`Anomalies detected in Refrigerator ${data.refrigeratorName}, Zone ${data.zoneName}:`, anomalies);

                // Надсилання аномалій на сервер
                try {
                    await axios.post('http://localhost:3000/sensors/anomalies', {
                        refrigeratorId: data.refrigeratorId,
                        zoneId: data.zoneId,
                        anomalies,
                    }, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    console.log(`Anomalies reported for Refrigerator ${data.refrigeratorName}, Zone ${data.zoneName}.`);
                } catch (anomalyError) {
                    console.error(`Failed to report anomalies for Refrigerator ${data.refrigeratorName}, Zone ${data.zoneName}:`, anomalyError.message);
                }
            }

            // Надсилання основних даних
            await axios.post('http://localhost:3000/sensors/data', data, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(`Data sent for Refrigerator ${data.refrigeratorName}, Zone ${data.zoneName}:`, data);

        } catch (error) {
            console.error(`Failed to send data for Refrigerator ${data.refrigeratorName}, Zone ${data.zoneName}:`, error.message);
        }
    }
}

// Функція для планування передачі даних
async function scheduleSensorDataSending() {
    try {
        console.log('Starting new iteration of scheduleSensorDataSending...');
        await sendSensorData();
    } catch (error) {
        console.error('Error in scheduleSensorDataSending:', error.message);
    } finally {
        console.log(`Waiting ${intervalFrequency / 1000} seconds before next data send...`);
        console.log('Scheduling the next iteration...');
        setTimeout(scheduleSensorDataSending, intervalFrequency);
    }    
}

// Запуск ініціалізації
initializeClient();