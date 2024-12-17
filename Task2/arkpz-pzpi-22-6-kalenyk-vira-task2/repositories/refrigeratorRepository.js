const db = require('../db');

// Отримати всі холодильники
const getRefrigerators = async () => {
  const [rows] = await db.query('SELECT * FROM Refrigerators');
  return rows;
};

// Отримати холодильник за ID
const getRefrigeratorById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Refrigerators WHERE RefrigeratorID = ?', [id]);
  return rows[0];
};

// Додати новий холодильник
const addRefrigerator = async (userId, name, location) => {
  const [result] = await db.query(
    'INSERT INTO Refrigerators (UserID, Name, Location) VALUES (?, ?, ?)',
    [userId, name, location]
  );
  return result;
};

// Оновити дані холодильника
const updateRefrigerator = async (id, userId, name, location) => {
  const [result] = await db.query(
    'UPDATE Refrigerators SET UserID = ?, Name = ?, Location = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE RefrigeratorID = ?',
    [userId, name, location, id]
  );
  return result;
};

// Видалити холодильник
const deleteRefrigerator = async (id) => {
  const [result] = await db.query('DELETE FROM Refrigerators WHERE RefrigeratorID = ?', [id]);
  return result;
};

const getRefrigeratorsByUser = async (userId) => {
    const [rows] = await db.query('SELECT * FROM Refrigerators WHERE UserID = ?', [userId]);
    return rows;
}; 

const getRefrigeratorsByLocation = async (location) => {
    const [rows] = await db.query('SELECT * FROM Refrigerators WHERE Location = ?', [location]);
    return rows;
};

const getRefrigeratorLastUpdate = async (id) => {
    const [rows] = await db.query(
        'SELECT UpdatedAt FROM Refrigerators WHERE RefrigeratorID = ?',
        [id]
    );
    return rows[0];
};

module.exports = {
  getRefrigerators,
  getRefrigeratorById,
  addRefrigerator,
  updateRefrigerator,
  deleteRefrigerator,
  getRefrigeratorsByUser,
  getRefrigeratorsByLocation,
  getRefrigeratorLastUpdate,
};
