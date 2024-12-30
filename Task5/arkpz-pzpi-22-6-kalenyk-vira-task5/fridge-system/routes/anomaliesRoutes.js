const express = require('express');
const router = express.Router();

let anomalies = []; // Масив для збереження аномалій у пам'яті

// Маршрут для обробки аномалій
router.post('/sensors/anomalies', (req, res) => {
    const { zoneId, anomalies: detectedAnomalies } = req.body; // Отримання даних із запиту
    console.log('Anomalies received from client:', req.body);

    // Перевірка валідності вхідних даних
    if (!zoneId || !detectedAnomalies || !Array.isArray(detectedAnomalies)) {
        return res.status(400).json({ message: 'Invalid anomalies data.' });
    }

    // Додавання аномалій до масиву
    anomalies.push({ zoneId, detectedAnomalies, timestamp: new Date() });
    console.log(`Anomalies logged for zone ${zoneId}:`, detectedAnomalies);

    // Відповідь клієнту
    res.status(200).json({ message: 'Anomalies logged successfully.' });
});

module.exports = router;
