require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const refrigeratorRoutes = require('./routes/refrigeratorRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const productRoutes = require('./routes/productRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/refrigerators', refrigeratorRoutes);
app.use('/sensors', sensorRoutes);
app.use('/products', productRoutes);
app.use('/sensor-data', sensorDataRoutes);
app.use('/notifications', notificationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});