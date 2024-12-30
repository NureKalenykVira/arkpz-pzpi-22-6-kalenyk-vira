const SensorManager = require('../src/sensors/sensorManager');

test('Розрахунок коефіцієнта відповідності: всі значення в нормі', () => {
    const sensorManager = new SensorManager([]);
    const coefficient = sensorManager.calculateComplianceCoefficient({
        temperature: 5,
        humidity: 50,
    });
    expect(coefficient).toBe("1.00");
});

test('Розрахунок коефіцієнта відповідності: одне значення поза нормою', () => {
    const sensorManager = new SensorManager([]);
    const coefficient = sensorManager.calculateComplianceCoefficient({
        temperature: 5,
        humidity: 80,
    });
    expect(coefficient).toBe("0.50");
});

test('Розрахунок коефіцієнта відповідності: всі значення поза нормою', () => {
    const sensorManager = new SensorManager([]);
    const coefficient = sensorManager.calculateComplianceCoefficient({
        temperature: -10,
        humidity: 80,
    });
    expect(coefficient).toBe("0.00");
});
