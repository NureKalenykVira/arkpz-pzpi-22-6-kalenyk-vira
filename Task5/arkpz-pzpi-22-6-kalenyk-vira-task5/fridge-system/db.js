const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, // {{RAILWAY_PRIVATE_DOMAIN}}
    user: process.env.DB_USER, // root
    password: process.env.DB_PASSWORD, // ваш пароль
    database: process.env.DB_NAME, // railway
    port: process.env.DB_PORT, // 3306
    waitForConnections: true,
    connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully');
    connection.release();
  }
});

module.exports = pool.promise();
