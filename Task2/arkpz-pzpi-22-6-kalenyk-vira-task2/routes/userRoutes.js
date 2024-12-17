const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', asyncHandler(userController.getAllUsers));
router.get('/users/:id', asyncHandler(userController.getUserById));
router.post('/users', asyncHandler(userController.addUser));
router.put('/users/:id', asyncHandler(userController.updateUser));
router.delete('/users/:id', asyncHandler(userController.deleteUser));

module.exports = router;