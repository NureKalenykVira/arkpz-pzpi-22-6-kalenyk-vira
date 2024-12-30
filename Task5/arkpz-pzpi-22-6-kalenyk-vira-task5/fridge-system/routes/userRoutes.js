const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const userController = require('../controllers/userController');
const { generateUserReports } = require('../business-logic/generateUserReports');
const router = express.Router();
const checkRole = require('../middlewares/checkRole');
const authenticateToken = require('../middlewares/authMiddleware');

router.put('/profile', authenticateToken, checkRole(['RegularUser']), asyncHandler(userController.updateUserProfile));
router.get('/generate-report/:userId', authenticateToken, checkRole(['GlobalAdmin', 'RegularUser']), asyncHandler(generateUserReports));
router.get('/', authenticateToken, checkRole(['GlobalAdmin', 'DBAdmin']), asyncHandler(userController.getAllUsers));
router.get('/:id', authenticateToken, checkRole(['GlobalAdmin', 'DBAdmin']), asyncHandler(userController.getUserById));
router.post('/', authenticateToken, checkRole(['GlobalAdmin']), asyncHandler(userController.addUser));
router.put('/:id', authenticateToken, checkRole(['GlobalAdmin']), asyncHandler(userController.updateUser));
router.delete('/:id', authenticateToken, checkRole(['GlobalAdmin']), asyncHandler(userController.deleteUser));

module.exports = router;