const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { handleAnomalousData } = require('../business-logic/handleAnomalousData');
const { analyzeStorageHandler } = require('../business-logic/analyzeStorageConditions');
const checkRole = require('../middlewares/checkRole');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/analyze-storage-conditions/:sensorId', authenticateToken, checkRole(['ProductAdmin', 'LogicAdmin']), analyzeStorageHandler);
router.post('/handle-anomalous-data', authenticateToken, checkRole(['LogicAdmin']), handleAnomalousData);
router.get('/', authenticateToken, checkRole(['ProductAdmin']), sensorController.getSensors);
router.get('/:id', authenticateToken, checkRole(['ProductAdmin']), sensorController.getSensorById);
router.post('/', authenticateToken, checkRole(['ProductAdmin']), sensorController.addSensor);
router.put('/:id', authenticateToken, checkRole(['ProductAdmin']), sensorController.updateSensor);
router.delete('/:id', authenticateToken, checkRole(['ProductAdmin']), sensorController.deleteSensor);
router.get('/refrigerator/:refrigeratorId', authenticateToken, checkRole(['ProductAdmin']), sensorController.getSensorsByRefrigerator);
router.patch('/:id/status', authenticateToken, checkRole(['ProductAdmin']), sensorController.updateSensorStatus);
router.get('/type/:type', authenticateToken, checkRole(['ProductAdmin']), sensorController.getSensorsByType);

module.exports = router;