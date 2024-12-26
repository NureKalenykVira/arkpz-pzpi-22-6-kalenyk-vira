const express = require('express');
const router = express.Router();
const { getZones } = require('../controllers/zonesController');

// Підключення маршруту для отримання зон
router.get('/zones', getZones);

module.exports = router;