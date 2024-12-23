const db = require('../db');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const getAlgorithmSettings = async (req, res) => {
    try {
        const [settings] = await db.query('SELECT * FROM AlgorithmSettings');
        res.status(200).json(settings);
    } catch (error) {
        console.error('Помилка отримання налаштувань алгоритмів:', error);
        res.status(500).json({ message: 'Помилка отримання налаштувань алгоритмів.' });
    }
};

const updateAlgorithmSettings = async (req, res) => {
    try {
        const { settingId, settingValue } = req.body;
        const [result] = await db.query(
            'UPDATE AlgorithmSettings SET SettingValue = ? WHERE SettingID = ?',
            [settingValue, settingId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Налаштування не знайдено.' });
        }
        res.status(200).json({ message: 'Налаштування успішно оновлено.' });
    } catch (error) {
        console.error('Помилка оновлення налаштувань алгоритмів:', error);
        res.status(500).json({ message: 'Помилка оновлення налаштувань алгоритмів.' });
    }
};

const getSensorThresholds = async (req, res) => {
    try {
        const [thresholds] = await db.query('SELECT * FROM SensorThresholds');
        res.status(200).json(thresholds);
    } catch (error) {
        console.error('Помилка отримання порогів сенсорів:', error);
        res.status(500).json({ message: 'Помилка отримання порогів сенсорів.' });
    }
};

const updateSensorThresholds = async (req, res) => {
    try {
        const { thresholdId, minValue, maxValue } = req.body;
        const [result] = await db.query(
            "UPDATE \`SensorThresholds\` SET \`MinValue\` = ?, \`MaxValue\` = ? WHERE \`ThresholdID\` = ?;",
            [minValue, maxValue, thresholdId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Поріг не знайдено.' });
        }
        res.status(200).json({ message: 'Поріг успішно оновлено.' });
    } catch (error) {
        console.error('Помилка оновлення порогів сенсорів:', error);
        res.status(500).json({ message: 'Помилка оновлення порогів сенсорів.' });
    }
};

const getReportSettings = async (req, res) => {
    try {
        const [settings] = await db.query('SELECT * FROM ReportSettings');
        res.status(200).json(settings);
    } catch (error) {
        console.error('Помилка отримання налаштувань звітів:', error);
        res.status(500).json({ message: 'Помилка отримання налаштувань звітів.' });
    }
};

const updateReportSettings = async (req, res) => {
    try {
        const { frequency } = req.body;
        const [result] = await db.query('UPDATE ReportSettings SET Frequency = ?', [frequency]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Налаштування не знайдено.' });
        }
        res.status(200).json({ message: 'Налаштування звітів успішно оновлено.' });
    } catch (error) {
        console.error('Помилка оновлення налаштувань звітів:', error);
        res.status(500).json({ message: 'Помилка оновлення налаштувань звітів.' });
    }
};

/**
 * Аналіз продуктивності бази даних
 */
const analyzePerformance = async (req, res) => {
    try {
        const [results] = await db.query("SHOW FULL PROCESSLIST");
        res.status(200).json(results);
    } catch (error) {
        console.error("Помилка аналізу продуктивності бази даних:", error);
        res.status(500).json({ message: "Помилка аналізу продуктивності бази даних." });
    }
};

/**
 * Створення резервної копії бази даних
 */
const createDatabaseBackup = async (req, res) => {
    const dbHost = "127.0.0.1";
    const dbPort = "3308";
    const dbUser = "root";
    const dbPassword = "PASSWORD";
    const dbName = "fridge_system";

    const timestamp = Date.now();
    const backupFilePath = `./backups/backup_${timestamp}.sql`;

    const command = `docker exec mysql_container mysqldump -uroot -pPASSWORD fridge_system > ./backups/backup_${Date.now()}.sql`;
    console.log(`Команда для бекапу: ${command}`);

    try {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Помилка створення резервної копії:", error);
                return res.status(500).json({ message: "Помилка створення резервної копії." });
            }

            res.status(200).json({
                message: "Резервну копію успішно створено.",
                backupPath: backupFilePath,
            });
        });
    } catch (error) {
        console.error("Помилка створення резервної копії:", error.message);
        res.status(500).json({ message: "Помилка створення резервної копії." });
    }
};

/**
 * Відновлення бази даних
 */
const restoreBackup = async (req, res) => {
    const { backupPath } = req.body;

    // Перевірка шляху до резервної копії
    if (!backupPath) {
        return res.status(400).json({ message: "Шлях до резервної копії є обов'язковим." });
    }

    const dbUser = "root";
    const dbPassword = "PASSWORD";
    const dbName = "fridge_system";

    const command = `docker exec -i mysql_container mysql -u${dbUser} -p${dbPassword} ${dbName} < ${backupPath}`;
    console.log(`Команда для відновлення: ${command}`);

    try {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Помилка відновлення бази даних:", error);
                return res.status(500).json({ message: "Помилка відновлення бази даних." });
            }

            res.status(200).json({ message: "Базу даних успішно відновлено." });
        });
    } catch (error) {
        console.error("Помилка відновлення бази даних:", error.message);
        res.status(500).json({ message: "Помилка відновлення бази даних." });
    }
};

/**
 * Управління доступом до бази даних
 */
const manageAccess = async (req, res) => {
    const { action, role, database, username, password } = req.body;

    if (!action || !role || !database || !username) {
        return res.status(400).json({ message: "Необхідно надати всі параметри (action, role, database, username)." });
    }

    const dbUser = "root";
    const dbPassword = "PASSWORD";

    try {
        // Команда для створення користувача
        const createUserCommand = `CREATE USER IF NOT EXISTS '${username}'@'%' IDENTIFIED BY '${password || 'default_password'}';`;

        // Команда для надання або зняття доступу
        const grantCommand =
            action === "grant"
                ? `GRANT ${role} ON ${database}.* TO '${username}'@'%';`
                : `REVOKE ${role} ON ${database}.* FROM '${username}'@'%';`;

        // Команда для застосування привілеїв
        const flushPrivileges = `FLUSH PRIVILEGES;`;

        // Повна команда
        const fullCommand = `docker exec -i mysql_container mysql -u${dbUser} -p${dbPassword} -e "${createUserCommand} ${grantCommand} ${flushPrivileges}"`;
        console.log(`Команда для управління доступом: ${fullCommand}`);

        exec(fullCommand, (error, stdout, stderr) => {
            if (error) {
                console.error("Помилка управління доступом до бази даних:", error);
                return res.status(500).json({ message: "Помилка управління доступом до бази даних." });
            }

            res.status(200).json({
                message: `${action === "grant" ? "Доступ надано" : "Доступ знято"} успішно.`,
            });
        });
    } catch (error) {
        console.error("Помилка управління доступом до бази даних:", error.message);
        res.status(500).json({ message: "Помилка управління доступом до бази даних." });
    }
};

const addSensorHistory = async (req, res) => {
    const { sensorId, parameterName, oldValue, newValue, changedBy } = req.body;

    if (!sensorId || !parameterName || !oldValue || !newValue || !changedBy) {
        return res.status(400).json({ message: "Усі поля є обов'язковими." });
    }

    try {
        const query = `
            INSERT INTO SensorHistory (sensor_id, parameter_name, old_value, new_value, changed_by)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(query, [sensorId, parameterName, oldValue, newValue, changedBy]);
        res.status(201).json({ message: "Зміни сенсора успішно записані в історію." });
    } catch (error) {
        console.error("Помилка запису в історію сенсорів:", error);
        res.status(500).json({ message: "Помилка запису в історію сенсорів." });
    }
};

const getSensorHistory = async (req, res) => {
    const { sensorId } = req.params;

    if (!sensorId) {
        return res.status(400).json({ message: "ID сенсора є обов'язковим." });
    }

    try {
        const query = `
            SELECT * FROM SensorHistory WHERE sensor_id = ?
            ORDER BY changed_at DESC
        `;
        const [rows] = await db.query(query, [sensorId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Помилка отримання історії сенсорів:", error);
        res.status(500).json({ message: "Помилка отримання історії сенсорів." });
    }
};

const addAnomalousData = async (req, res) => {
    const { sensorId, dataType, value, anomalyReason } = req.body;

    if (!sensorId || !dataType || !value || !anomalyReason) {
        return res.status(400).json({ message: "Усі поля є обов'язковими." });
    }

    try {
        const query = `
            INSERT INTO AnomalousDataLogs (sensor_id, data_type, value, anomaly_reason)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(query, [sensorId, dataType, value, anomalyReason]);
        res.status(201).json({ message: "Аномальні дані успішно записані." });
    } catch (error) {
        console.error("Помилка запису аномальних даних:", error);
        res.status(500).json({ message: "Помилка запису аномальних даних." });
    }
};

const getAnomalousData = async (req, res) => {
    const { sensorId } = req.params;

    if (!sensorId) {
        return res.status(400).json({ message: "ID сенсора є обов'язковим." });
    }

    try {
        const query = `
            SELECT * FROM AnomalousDataLogs WHERE sensor_id = ?
            ORDER BY recorded_at DESC
        `;
        const [rows] = await db.query(query, [sensorId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Помилка отримання аномальних даних:", error);
        res.status(500).json({ message: "Помилка отримання аномальних даних." });
    }
};


module.exports = { getAlgorithmSettings, 
                updateAlgorithmSettings, 
                getSensorThresholds, 
                updateSensorThresholds, 
                getReportSettings, 
                updateReportSettings,
                analyzePerformance,
                createDatabaseBackup,
                restoreBackup,
                manageAccess, 
                addSensorHistory,
                getSensorHistory,
                addAnomalousData,
                getAnomalousData };