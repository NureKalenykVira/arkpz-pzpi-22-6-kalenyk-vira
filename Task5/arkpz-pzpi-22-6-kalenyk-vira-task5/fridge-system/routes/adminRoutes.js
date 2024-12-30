const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const asyncHandler = require('../middlewares/asyncHandler');  
const { getConfigurations, updateConfiguration } = require('../controllers/configController');
const { generateGeneralReport } = require('../controllers/reportController');
const { getAlgorithmSettings } = require('../controllers/adminController');
const { updateAlgorithmSettings } = require('../controllers/adminController');
const { getSensorThresholds } = require('../controllers/adminController');
const { updateSensorThresholds } = require('../controllers/adminController');
const { getReportSettings } = require('../controllers/adminController');
const { updateReportSettings } = require('../controllers/adminController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/configurations', authenticateToken, checkRole(['GlobalAdmin']), getConfigurations);
router.put('/configurations', authenticateToken, checkRole(['GlobalAdmin']), updateConfiguration);
router.get('/general-report', authenticateToken, checkRole(['GlobalAdmin']), generateGeneralReport);

router.get('/algorithm-settings', authenticateToken, checkRole(['LogicAdmin']), asyncHandler(getAlgorithmSettings));
router.put('/algorithm-settings', authenticateToken, checkRole(['LogicAdmin']), asyncHandler(updateAlgorithmSettings));
router.get('/sensor-thresholds', authenticateToken, checkRole(['LogicAdmin']), asyncHandler(getSensorThresholds));
router.put('/sensor-thresholds', authenticateToken, checkRole(['LogicAdmin']), asyncHandler(updateSensorThresholds));
router.get('/report-settings', authenticateToken, checkRole(['LogicAdmin']), asyncHandler(getReportSettings));
router.put('/report-settings', authenticateToken, checkRole(['LogicAdmin']), asyncHandler(updateReportSettings));

router.get('/db/performance', authenticateToken, checkRole(['DBAdmin']), adminController.analyzePerformance);
router.post('/db/backup', authenticateToken, checkRole(['DBAdmin']), adminController.createDatabaseBackup);
router.post('/db/restore', authenticateToken, checkRole(['DBAdmin']), adminController.restoreBackup);
router.post('/db/access', authenticateToken, checkRole(['DBAdmin']), adminController.manageAccess);

router.post('/sensors/history', authenticateToken, checkRole(['ProductAdmin']), adminController.addSensorHistory);
router.get('/sensors/history/:sensorId', authenticateToken, checkRole(['ProductAdmin']), adminController.getSensorHistory);
router.post('/sensors/anomalies', authenticateToken, checkRole(['ProductAdmin']), adminController.addAnomalousData);
router.get('/sensors/anomalies/:sensorId', authenticateToken, checkRole(['ProductAdmin']), adminController.getAnomalousData);
module.exports = router;