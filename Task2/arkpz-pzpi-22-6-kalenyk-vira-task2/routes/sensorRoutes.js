const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const asyncHandler = require('../middlewares/asyncHandler');

router.get('/', sensorController.getSensors);
router.get('/:id', sensorController.getSensorById);
router.post('/', sensorController.addSensor);
router.put('/:id', sensorController.updateSensor);
router.delete('/:id', sensorController.deleteSensor);
router.get('/refrigerator/:refrigeratorId', sensorController.getSensorsByRefrigerator);
router.patch('/:id/status', sensorController.updateSensorStatus);
router.get('/type/:type', sensorController.getSensorsByType);

module.exports = router;