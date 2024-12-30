const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const sensorDataController = require('../controllers/sensorDataController');
const router = express.Router();
const checkRole = require('../middlewares/checkRole');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, checkRole(['ProductAdmin', 'LogicAdmin']), sensorDataController.getSensorData);
router.get('/:id', authenticateToken, checkRole(['ProductAdmin']), sensorDataController.getSensorDataById);
router.post('/', authenticateToken, checkRole(['ProductAdmin']), sensorDataController.addSensorData);
router.put('/:id', authenticateToken, checkRole(['ProductAdmin']), sensorDataController.updateSensorData);
router.delete('/:id', authenticateToken, checkRole(['ProductAdmin']), sensorDataController.deleteSensorData);
router.get('/sensor/:sensorId', authenticateToken, checkRole(['ProductAdmin']), sensorDataController.getSensorDataBySensor);
router.get('/product/:productId', authenticateToken, checkRole(['ProductAdmin']), sensorDataController.getSensorDataByProduct);
router.get('/date', authenticateToken, checkRole(['LogicAdmin']), sensorDataController.getSensorDataByDate);

module.exports = router;