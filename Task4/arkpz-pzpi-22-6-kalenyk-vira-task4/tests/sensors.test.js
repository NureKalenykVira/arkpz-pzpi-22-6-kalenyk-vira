const TemperatureSensor = require('../src/sensors/temperatureSensor');
const HumiditySensor = require('../src/sensors/humiditySensor');
const RfidSensor = require('../src/sensors/rfidSensor');

test('Генерація даних сенсора температури', () => {
    const sensor = new TemperatureSensor(1);
    const data = sensor.generateData();
    expect(data.zoneId).toBe(1);
    expect(Number(data.temperature)).toBeGreaterThanOrEqual(-5);
    expect(Number(data.temperature)).toBeLessThanOrEqual(10);
});

test('Генерація даних сенсора вологості', () => {
    const sensor = new HumiditySensor(1);
    const data = sensor.generateData();
    expect(data.zoneId).toBe(1);
    expect(Number(data.humidity)).toBeGreaterThanOrEqual(20);
    expect(Number(data.humidity)).toBeLessThanOrEqual(100);
});

test('Сканування RFID-зчитувача', () => {
    const sensor = new RfidSensor(1);
    const data = sensor.scan();
    expect(data.zoneId).toBe(1);
    expect(data.scannedProduct).toBeDefined();
    expect(data.timestamp).toBeDefined();
});
