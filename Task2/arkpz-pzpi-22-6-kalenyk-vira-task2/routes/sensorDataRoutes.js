const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const sensorDataController = require('../controllers/sensorDataController');
const router = express.Router();

router.get('/', sensorDataController.getSensorData);
router.get('/:id', sensorDataController.getSensorDataById);
router.post('/', sensorDataController.addSensorData);
router.put('/:id', sensorDataController.updateSensorData);
router.delete('/:id', sensorDataController.deleteSensorData);
router.get('/sensor/:sensorId', sensorDataController.getSensorDataBySensor);
router.get('/product/:productId', sensorDataController.getSensorDataByProduct);
router.get('/date', sensorDataController.getSensorDataByDate);

module.exports = router;