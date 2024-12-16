const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/', notificationController.getNotifications);
router.get('/:id', notificationController.getNotificationById);
router.post('/', notificationController.addNotification);
router.patch('/:id/status', notificationController.updateNotificationStatus);
router.delete('/:id', notificationController.deleteNotification);
router.get('/user/:userId', notificationController.getNotificationsByUser);

module.exports = router;