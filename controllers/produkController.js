const Produk = require('../models/Produk');

// Mendapatkan semua produk
const getAllProduk = async (req, res) => {
  try {
    const produk = await Produk.find().populate('id_akun');
    res.status(200).json(produk);
  } catch (err) {
    console.error('Error fetching produk:', err);
    res.status(500).json({ message: 'Failed to fetch produk' });
  }
};

// Mendapatkan satu produk berdasarkan ID
const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id).populate('id_akun');
    if (!produk) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(produk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Membuat produk baru
const createProduk = async (req, res) => {
  const produk = new Produk(req.body);
  try {
    await produk.save();
    res.status(201).json(produk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Memperbarui produk
const updateProduk = async (req, res) => {
  try {
    const produk = await Produk.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produk) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(produk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menghapus produk
const deleteProduk = async (req, res) => {
  try {
    const produk = await Produk.findByIdAndDelete(req.params.id);
    if (!produk) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
};
