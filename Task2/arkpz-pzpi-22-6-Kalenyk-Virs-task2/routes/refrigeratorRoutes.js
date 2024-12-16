const express = require('express');
const router = express.Router();
const refrigeratorController = require('../controllers/refrigeratorController');

router.get('/', refrigeratorController.getRefrigerators);
router.get('/:id', refrigeratorController.getRefrigeratorById);
router.post('/', refrigeratorController.addRefrigerator);
router.put('/:id', refrigeratorController.updateRefrigerator);
router.delete('/:id', refrigeratorController.deleteRefrigerator);
router.get('/user/:userId', refrigeratorController.getRefrigeratorsByUser);
router.get('/location/:location', refrigeratorController.getRefrigeratorsByLocation);
router.get('/:id/last-update', refrigeratorController.getRefrigeratorLastUpdate);

module.exports = router;
