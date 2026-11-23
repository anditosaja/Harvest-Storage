import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cropRoutes from './routes/cropRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware parsing JSON
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di Harvest Storage',
    endpoints: '/api/crops',
  });
});

// Routes utama
app.use('/api/crops', cropRoutes);

// Handler 404 untuk route yang tidak terdaftar
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});