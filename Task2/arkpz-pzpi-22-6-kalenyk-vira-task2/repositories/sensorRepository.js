const db = require('../db');

// Отримати всі датчики
const getSensors = async () => {
  const [rows] = await db.query('SELECT * FROM Sensors');
  return rows;
};

// Отримати датчик за ID
const getSensorById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Sensors WHERE SensorID = ?', [id]);
  return rows[0];
};

// Додати новий датчик
const addSensor = async (refrigeratorId, type, status) => {
  const [result] = await db.query(
    'INSERT INTO Sensors (RefrigeratorID, Type, Status) VALUES (?, ?, ?)',
    [refrigeratorId, type, status]
  );
  return result;
};

// Оновити датчик
const updateSensor = async (id, type, status) => {
  const [result] = await db.query(
    'UPDATE Sensors SET Type = ?, Status = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE SensorID = ?',
    [type, status, id]
  );
  return result;
};

// Видалити датчик
const deleteSensor = async (id) => {
  const [result] = await db.query('DELETE FROM Sensors WHERE SensorID = ?', [id]);
  return result;
};

// Отримати датчики за холодильником
const getSensorsByRefrigerator = async (refrigeratorId) => {
  const [rows] = await db.query('SELECT * FROM Sensors WHERE RefrigeratorID = ?', [refrigeratorId]);
  return rows;
};

// Оновити статус датчика
const updateSensorStatus = async (id, status) => {
  const [result] = await db.query(
    'UPDATE Sensors SET Status = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE SensorID = ?',
    [status, id]
  );
  return result;
};

// Отримати датчики за типом
const getSensorsByType = async (type) => {
  const [rows] = await db.query('SELECT * FROM Sensors WHERE Type = ?', [type]);
  return rows;
};

module.exports = {
  getSensors,
  getSensorById,
  addSensor,
  updateSensor,
  deleteSensor,
  getSensorsByRefrigerator,
  updateSensorStatus,
  getSensorsByType,
};