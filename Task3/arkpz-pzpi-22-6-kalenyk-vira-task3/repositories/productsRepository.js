const db = require('../db');

// Отримати всі продукти
const getProducts = async () => {
  const [rows] = await db.query('SELECT * FROM Products');
  return rows;
};

// Отримати продукт за ID
const getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Products WHERE ProductID = ?', [id]);
  return rows[0];
};

// Додати новий продукт
const addProduct = async (refrigeratorId, name, category, expirationDate, rfidTag) => {
  const [result] = await db.query(
    'INSERT INTO Products (RefrigeratorID, Name, Category, ExpirationDate, RFIDTag) VALUES (?, ?, ?, ?, ?)',
    [refrigeratorId, name, category, expirationDate, rfidTag]
  );
  return result;
};

// Оновити продукт
const updateProduct = async (id, name, category, expirationDate, rfidTag) => {
  const [result] = await db.query(
    'UPDATE Products SET Name = ?, Category = ?, ExpirationDate = ?, RFIDTag = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE ProductID = ?',
    [name, category, expirationDate, rfidTag, id]
  );
  return result;
};

// Видалити продукт
const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM Products WHERE ProductID = ?', [id]);
  return result;
};

// Отримати продукти для холодильника
const getProductsByRefrigerator = async (refrigeratorId) => {
  const [rows] = await db.query('SELECT * FROM Products WHERE RefrigeratorID = ?', [refrigeratorId]);
  return rows;
};

// Знайти продукти за категорією
const getProductsByCategory = async (category) => {
  const [rows] = await db.query('SELECT * FROM Products WHERE Category = ?', [category]);
  return rows;
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