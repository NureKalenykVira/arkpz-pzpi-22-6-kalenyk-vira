require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const refrigeratorRoutes = require('./routes/refrigeratorRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const productRoutes = require('./routes/productRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/users', userRoutes);
app.use('/refrigerators', refrigeratorRoutes);
app.use('/sensors', sensorRoutes);
app.use('/products', productRoutes);
app.use('/sensor-data', sensorDataRoutes);
app.use('/notifications', notificationRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const clearExpiredTokens = async () => {
  try {
      await db.query('DELETE FROM UserTokens WHERE Expiration < NOW()');
      console.log('Протерміновані токени видалено.');
  } catch (error) {
      console.error('Помилка при видаленні протермінованих токенів:', error);
  }
};

setInterval(clearExpiredTokens, 3600000);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
