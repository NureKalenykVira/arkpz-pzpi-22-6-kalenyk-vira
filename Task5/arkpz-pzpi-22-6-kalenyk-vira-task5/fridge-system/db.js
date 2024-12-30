const mysql = require('mysql2');
require('dotenv').config();

async function createPool() {
    try {
        const pool = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
        });
        console.log('Database connected successfully.');
        return pool;
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        throw error;
    }
}

const pool = createPool();

module.exports = pool;
