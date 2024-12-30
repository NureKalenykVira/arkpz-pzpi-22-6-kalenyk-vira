const axios = require('axios');
const API_URL = process.env.API_URL || 'https://server-f0rb.onrender.com'; // Використання змінної середовища API_URL

async function loadThresholds() {
    try {
        const response = await axios.get(`${API_URL}/settings/thresholds`);
        return response.data;
    } catch (error) {
        console.error('Failed to load thresholds:', error.message);
        return null;
    }
}

async function loadInterval() {
    try {
        const response = await axios.get(`${API_URL}/settings/interval`);
        return response.data.frequency;
    } catch (error) {
        console.error('Failed to load interval:', error.message);
        return null;
    }
}

async function loadZones() {
    try {
        const response = await axios.get(`${API_URL}/zones/zones`);
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
