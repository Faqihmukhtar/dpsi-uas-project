const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
    nama_produk: { type: String, required: true },
    deskripsi: { type: String, required: true },
    harga_produk: { type: Number, required: true },
    stok_produk: { type: Number, required: true },
    id_akun: { type: mongoose.Schema.Types.ObjectId, ref: 'Akun', required: true }
});

const Produk = mongoose.model('Produk', produkSchema);
module.exports = Produk;
