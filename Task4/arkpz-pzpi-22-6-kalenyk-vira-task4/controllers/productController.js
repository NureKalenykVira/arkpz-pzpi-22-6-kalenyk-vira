const productRepository = require('../repositories/productsRepository');
const calculateRecommendedConsumptionDate = require('../business-logic/calculateRecommendedConsumptionDate');
const notifyNearExpiration = require('../business-logic/notifyNearExpiration');
const notifyExpiration = require('../business-logic/notifyExpiration');

// Отримати всі продукти
const getProducts = async (req, res) => {
  try {
    const products = await productRepository.getProducts();
    //await notifyNearExpiration(products);
    //await notifyExpiration(products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Отримати продукт за ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productRepository.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Додати продукт
const addProduct = async (req, res) => {
  const refrigeratorId = req.body.refrigeratorId ?? req.body.RefrigeratorID;
  const name = req.body.name ?? req.body.Name;
  const category = req.body.category ?? req.body.Category;
  const expirationDate = req.body.expirationDate ?? req.body.ExpirationDate;
  const rfidTag = req.body.rfidTag ?? req.body.RFIDTag;
  if (!refrigeratorId || !name || !category) {
    return res.status(400).json({ error: 'RefrigeratorID, Name, Category обов’язкові' });
  }
  try {
    const result = await productRepository.addProduct(refrigeratorId, name, category, expirationDate, rfidTag);
    res.status(201).json({ productId: result.insertId });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Оновити продукт
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, expirationDate, rfidTag } = req.body;

  // Припустимо, що middleware додав userId в req.user.userId
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await productRepository.updateProduct(id, name, category, expirationDate, rfidTag, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productRepository.deleteProduct(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Отримати продукти для конкретного холодильника
const getProductsByRefrigerator = async (req, res) => {
  const { refrigeratorId } = req.params;
  try {
    const products = await productRepository.getProductsByRefrigerator(refrigeratorId);
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found for this refrigerator' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by refrigerator:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Знайти продукти за категорією
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await productRepository.getProductsByCategory(category);
    if (products.length === 0) {
      return res.status(404).json({ error: `No products found in category '${category}'` });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByRefrigerator,
  getProductsByCategory,
};