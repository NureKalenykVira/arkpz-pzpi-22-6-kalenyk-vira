const mysql = require('mysql2');
require('dotenv').config();

try {
    const pool = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });
    console.log('Database connected successfully.');
    return connection;
} catch (error) {
    console.error('Database connection failed:', error.message);
}


module.exports = pool.promise();
