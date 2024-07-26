const Pesanan = require('../models/Pesanan');

// Mendapatkan semua pesanan
const getAllPesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.find().populate('id_akun').populate('id_produk');
    res.status(200).json(pesanan);
  } catch (err) {
    console.error('Error fetching pesanan:', err);
    res.status(500).json({ message: 'Failed to fetch pesanan' });
  }
};

// Mendapatkan satu pesanan berdasarkan ID
const getPesananById = async (req, res) => {
  try {
    const pesanan = await Pesanan.findById(req.params.id).populate('id_akun').populate('id_produk');
    if (!pesanan) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json(pesanan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Membuat pesanan baru
const createPesanan = async (req, res) => {
  const pesanan = new Pesanan(req.body);
  try {
    await pesanan.save();
    res.status(201).json(pesanan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Memperbarui pesanan
const updatePesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pesanan) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json(pesanan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menghapus pesanan
const deletePesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.findByIdAndDelete(req.params.id);
    if (!pesanan) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json({ message: 'Pesanan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPesanan,
  getPesananById,
  createPesanan,
  updatePesanan,
  deletePesanan,
};
