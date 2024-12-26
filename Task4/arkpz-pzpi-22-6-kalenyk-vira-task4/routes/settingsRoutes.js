const express = require('express');
const router = express.Router();
const {
    getThresholdsHandler,
    updateThresholdsHandler,
    getIntervalHandler,
    updateIntervalHandler,
} = require('../controllers/settingsController');

// Маршрут для отримання порогових значень
router.get('/thresholds', getThresholdsHandler);

// Маршрут для оновлення порогових значень
router.post('/thresholds', updateThresholdsHandler);

// Маршрут для отримання частоти передачі даних
router.get('/interval', getIntervalHandler);

// Маршрут для оновлення частоти передачі даних
router.post('/interval', updateIntervalHandler);

module.exports = router;
