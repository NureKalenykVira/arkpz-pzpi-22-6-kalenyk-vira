const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const { userRole } = req; // Роль користувача через токен
        console.log('Роль, отримана з токена:', userRole);
        console.log('Дозволені ролі для цього маршруту:', allowedRoles);
        console.log('Поточний маршрут:', req.originalUrl); // Додайте лог для перевірки маршруту
        if (!allowedRoles.includes(userRole)) {
            console.log('Доступ заборонено. Роль не співпадає.');
            return res.status(403).json({ message: "Недостатньо прав доступу." });
        }
        console.log('Доступ дозволено.');
        next();
    };
};

module.exports = checkRole;