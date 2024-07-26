const mongoose = require('mongoose');

const pesananSchema = new mongoose.Schema({
    id_akun: { type: mongoose.Schema.Types.ObjectId, ref: 'Akun', required: true },
    id_produk: { type: mongoose.Schema.Types.ObjectId, ref: 'Produk', required: true },
    kuantitas: { type: Number, required: true },
    totalHarga: { type: Number, required: true },
    kartuKredit: { type: String, required: true },
    pengirim: { type: String, required: true }
});

const Pesanan = mongoose.model('Pesanan', pesananSchema);
module.exports = Pesanan;
