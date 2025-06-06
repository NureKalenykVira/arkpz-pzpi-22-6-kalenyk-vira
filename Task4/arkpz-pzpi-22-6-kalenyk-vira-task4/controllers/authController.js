const jwt = require('jsonwebtoken');
const db = require('../db');
const bcrypt = require('bcryptjs');

/**
 * Логін користувача
 */
const loginUser = async (req, res) => {
    console.log('✅ Виконується loginUser ІЗ ТОЧНО ТАКОГО ФАЙЛУ');
    console.log('🔥 Виконано loginUser');
    try {
        const { email, password } = req.body;

        const [users] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Користувач не знайдений.' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неправильний пароль.' });
        }

        // 1. Перевірка: чи вже є активний токен
        const [existingTokens] = await db.query(
            'SELECT Token, Expiration FROM UserTokens WHERE UserID = ? AND Expiration > NOW()',
            [user.UserID]
        );

        if (existingTokens.length > 0) {
            const existing = existingTokens[0];
            return res.json({
                message: 'Авторизація успішна (повернуто існуючий токен).',
                token: existing.Token,
                expiration: existing.Expiration
            });
        }

        // 2. Генерація нового токена (1 рік)
        const token = jwt.sign(
            { userId: user.UserID, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '365d' }
        );

        const expiration = new Date();
        expiration.setFullYear(expiration.getFullYear() + 1);

        await db.query(`
  INSERT INTO UserTokens (UserID, Token, Expiration)
  VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE Token = VALUES(Token), Expiration = VALUES(Expiration)
`, [user.UserID, token, expiration]);


        res.json({
            message: 'Авторизація успішна (згенеровано новий токен).',
            token,
            expiration
        });

    } catch (error) {
        console.error('Помилка при авторизації:', error.message);
        res.status(500).json({ message: 'Помилка при авторизації.', detail: error.message });
    }
};

/**
 * Реєстрація нового користувача
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        console.log('Дані для реєстрації:', { name, email, password, role });

        // Перевірка, чи існує користувач із таким email
        const [existingUsers] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Користувач із таким email вже існує.' });
        }

        // Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Додавання нового користувача до бази даних
        const [result] = await db.query(
            'INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'RegularUser'] // Роль за замовчуванням
        );

        const userId = result.insertId;

        // Генерація токена
        // Генерація токена (на 1 рік)
const token = jwt.sign(
    { userId, role: role || 'RegularUser' },
    process.env.JWT_SECRET,
    { expiresIn: '365d' }
);

const expiration = new Date();
expiration.setFullYear(expiration.getFullYear() + 1);

// Збереження токена в базу
await db.query(`
  INSERT INTO UserTokens (UserID, Token, Expiration)
  VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE Token = VALUES(Token), Expiration = VALUES(Expiration)
`, [userId, token, expiration]);

        res.status(201).json({
            message: 'Користувач успішно зареєстрований.',
            userId,
            token,
        });
    } catch (error) {
        console.error('Помилка при реєстрації користувача:', error.message);
        res.status(500).json({ message: 'Помилка при реєстрації користувача.' });
    }
};

module.exports = { loginUser, registerUser };