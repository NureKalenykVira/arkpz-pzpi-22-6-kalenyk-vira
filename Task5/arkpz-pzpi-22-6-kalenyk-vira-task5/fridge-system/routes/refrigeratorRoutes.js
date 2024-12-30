const express = require('express');
const router = express.Router();
const refrigeratorController = require('../controllers/refrigeratorController');
const checkRole = require('../middlewares/checkRole');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, checkRole(['ProductAdmin', 'RegularUser']), refrigeratorController.getRefrigerators);
router.get('/:id', authenticateToken, checkRole(['ProductAdmin', 'RegularUser']), refrigeratorController.getRefrigeratorById);
router.post('/', authenticateToken, checkRole(['ProductAdmin']), refrigeratorController.addRefrigerator);
router.put('/:id', authenticateToken, checkRole(['ProductAdmin']), refrigeratorController.updateRefrigerator);
router.delete('/:id', authenticateToken, checkRole(['ProductAdmin']), refrigeratorController.deleteRefrigerator);
router.get('/user/:userId', authenticateToken, checkRole(['GlobalAdmin', 'ProductAdmin']), refrigeratorController.getRefrigeratorsByUser);
router.get('/location/:location', authenticateToken, checkRole(['ProductAdmin']), refrigeratorController.getRefrigeratorsByLocation);
router.get('/:id/last-update', authenticateToken, checkRole(['ProductAdmin']), refrigeratorController.getRefrigeratorLastUpdate);

module.exports = router;
