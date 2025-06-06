const jwt = require('jsonwebtoken');
const db = require('../db');

/**
 * Middleware для перевірки токена
 */
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('🛠 Отримано запит з токеном:', req.headers['authorization']);

    if (!token) {
        return res.status(401).json({ message: 'Необхідна авторизація.' });
    }

    try {
        console.log('>>> Отриманий з заголовка токен:', token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('>>> Розкодовка JWT:', decoded);

// Перевірка в БД (залишається без змін)
const [rows] = await db.query('SELECT * FROM UserTokens WHERE Token = ? AND Expiration > NOW()', [token]);
if (rows.length === 0) {
  console.log('❌ Токен не знайдено або протермінований у БД:', token);
  return res.status(403).json({ message: 'Токен недійсний або термін дії завершено.' });
}

// 🛠️ Ось ця частина — головне:
req.user = {
  userId: decoded.userId,
  role: decoded.role
};

console.log('Роль, отримана з токена:', decoded.role);
next();
    } catch (error) {

        console.error('Помилка авторизації:', error);
        res.status(403).json({ message: 'Неправильний або прострочений токен.' });
    }
};

module.exports = authenticateToken;