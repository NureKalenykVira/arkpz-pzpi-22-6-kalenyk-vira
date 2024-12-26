const axios = require('axios');

async function loadThresholds() {
    try {
        const response = await axios.get('http://localhost:3000/settings/thresholds');
        return response.data;
    } catch (error) {
        console.error('Failed to load thresholds:', error.message);
        return null;
    }
}

async function loadInterval() {
    try {
        const response = await axios.get('http://localhost:3000/settings/interval');
        return response.data.frequency;
    } catch (error) {
        console.error('Failed to load interval:', error.message);
        return null;
    }
}

async function loadZones() {
    try {
        const response = await axios.get('http://localhost:3000/zones/zones');
        console.log('Loaded zones from server:', response.data);
        return response.data || [];
    } catch (error) {
        console.error('Failed to load zones:', error.message);
        return [];
    }
}

module.exports = {
    loadThresholds,
    loadInterval,
    loadZones,
};
