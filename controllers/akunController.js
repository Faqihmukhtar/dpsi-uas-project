const Akun = require('../models/Akun');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register akun
const registerAkun = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Validasi input
    if (!username || !password || !email || !role) {
      return res.status(400).json({ message: 'Username, password, email, and role are required' });
    }

    // Cek apakah username sudah ada
    const existingUser = await Akun.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat akun baru
    const newAkun = new Akun({ username, password: hashedPassword, email, role });
    await newAkun.save();
    res.status(201).json({ message: 'Akun registered successfully' });
  } catch (err) {
    console.error('Error creating akun:', err);
    res.status(500).json({ message: 'Failed to register akun' });
  }
};

// Login akun
const loginAkun = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Cek akun dan verifikasi password
    const akun = await Akun.findOne({ username });
    if (!akun || !(await bcrypt.compare(password, akun.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: akun._id, role: akun.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in akun:', err);
    res.status(500).json({ message: 'Failed to login akun' });
  }
};

// Mendapatkan semua akun
const getAllAkun = async (req, res) => {
  try {
    const akun = await Akun.find();
    res.status(200).json(akun);
  } catch (err) {
    console.error('Error fetching akun:', err);
    res.status(500).json({ message: 'Failed to fetch akun' });
  }
};

// Mendapatkan satu akun berdasarkan ID
const getAkunById = async (req, res) => {
  try {
    const akun = await Akun.findById(req.params.id);
    if (!akun) return res.status(404).json({ message: 'Akun tidak ditemukan' });
    res.json(akun);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Membuat akun baru
const createAkun = async (req, res) => {
  const akun = new Akun(req.body);
  try {
    await akun.save();
    res.status(201).json(akun);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Memperbarui akun
const updateAkun = async (req, res) => {
  try {
    const akun = await Akun.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!akun) return res.status(404).json({ message: 'Akun tidak ditemukan' });
    res.json(akun);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menghapus akun
const deleteAkun = async (req, res) => {
  try {
    const akun = await Akun.findByIdAndDelete(req.params.id);
    if (!akun) return res.status(404).json({ message: 'Akun tidak ditemukan' });
    res.json({ message: 'Akun berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerAkun,
  loginAkun,
  getAllAkun,
  getAkunById,
  createAkun,
  updateAkun,
  deleteAkun,
};
