const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/refrigerator/:refrigeratorId', productController.getProductsByRefrigerator);
router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;