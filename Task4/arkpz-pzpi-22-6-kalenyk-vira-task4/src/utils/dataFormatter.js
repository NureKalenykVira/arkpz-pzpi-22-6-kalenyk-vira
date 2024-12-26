function checkThresholds(sensorData, thresholds) {
    const anomalies = [];

    if (sensorData.temperature > thresholds.maxTemperature || sensorData.temperature < thresholds.minTemperature) {
        anomalies.push(`Temperature out of range: ${sensorData.temperature}°C`);
    }

    if (sensorData.humidity > thresholds.maxHumidity || sensorData.humidity < thresholds.minHumidity) {
        anomalies.push(`Humidity out of range: ${sensorData.humidity}%`);
    }

    return anomalies;
}

function updateThresholds(newThresholds) {
    global.thresholds = { ...global.thresholds, ...newThresholds };
}

function refreshThresholds() {
    return global.thresholds || {};
}

let thresholds = {};

function updateThresholds(newThresholds) {
    if (typeof newThresholds === 'object' && newThresholds !== null) {
        thresholds = { ...thresholds, ...newThresholds };
        console.log('Thresholds updated to:', thresholds);
    } else {
        console.error('Invalid thresholds provided:', newThresholds);
    }
}

function getThresholds() {
    return thresholds;
}

async function refreshThresholds() {
    try {
        const newThresholds = await loadThresholds();
        updateThresholds(newThresholds); // Виклик функції
        console.log('Thresholds refreshed:', thresholds);
    } catch (error) {
        console.error('Failed to refresh thresholds:', error.message);
    }
}


function formatData(sensorData) {
    return {
        timestamp: new Date().toISOString(),
        ...sensorData,
    };
}

// src/utils/dataFormatter.js

function checkThresholds(data, thresholds) {
    const anomalies = [];
    if (data.temperature > thresholds.maxTemperature || data.temperature < thresholds.minTemperature) {
        anomalies.push(`Temperature out of range: ${data.temperature}°C`);
    }
    if (data.humidity > thresholds.maxHumidity || data.humidity < thresholds.minHumidity) {
        anomalies.push(`Humidity out of range: ${data.humidity}%`);
    }
    return anomalies;
}

function updateThresholds(newThresholds) {
    global.thresholds = { ...global.thresholds, ...newThresholds };
}

function refreshThresholds() {
    return global.thresholds || {};
}

module.exports = { checkThresholds, updateThresholds, refreshThresholds };