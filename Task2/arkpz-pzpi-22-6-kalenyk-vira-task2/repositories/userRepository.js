const db = require('../db');

async function getUsers() {
    const [rows] = await db.execute(`SELECT * FROM Users`);
    return rows;
  }

async function getUserById(id) {
    const [users] = await db.execute(`SELECT * FROM Users WHERE UserID = ?`, [id]);
    console.log('Query result:', users);
    return users[0];
  }

async function updateUser(id, name, email, password, role) {
    const [result] = await db.execute(
      `UPDATE Users SET Name = ?, Email = ?, Password = ?, Role = ? WHERE UserID = ?`,
      [name, email, password, role, id]
    );
    return result;
  }

async function addUser(name, email, password, role) {
    const [existingUser] = await db.execute(
      `SELECT * FROM Users WHERE Email = ?`,
      [email]
    );
  
    if (existingUser.length > 0) {
      throw new Error('Email already exists');
    }
  
    const [result] = await db.execute(
      `INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)`,
      [name, email, password, role]
    );
  
    return result;
  }

async function deleteUser(id) {
    const [result] = await db.execute(`DELETE FROM Users WHERE UserID = ?`, [id]);
    return result;
  }

module.exports = {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };