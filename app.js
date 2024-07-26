const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

// Tambahkan log ini untuk memverifikasi bahwa variabel lingkungan dimuat dengan benar
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
app.use(express.json());

const akunRoutes = require('./routes/akun');
const pesananRoutes = require('./routes/pesanan');
const produkRoutes = require('./routes/produk');

// Menggunakan rute dengan middleware
app.use('/akun', akunRoutes);
app.use('/pesanan', pesananRoutes);
app.use('/produk', produkRoutes);

const port = process.env.PORT || 3000;

// Pastikan MONGO_URI sudah diatur di file .env
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI is not defined in .env file.');
  process.exit(1); // Keluar dari proses dengan kesalahan
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Route untuk root URL
app.get('/', (req, res) => {
  res.send('Selamat datang di API Muhammad Faqih');
});