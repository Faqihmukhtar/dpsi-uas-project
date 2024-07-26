const express = require('express');
const router = express.Router();
const { getAllProduk, getProdukById, createProduk, updateProduk, deleteProduk } = require('../controllers/produkController');
const { authenticate, authorize } = require('../middleware/auth');

// Rute CRUD dengan middleware dan pengontrol
router.get('/', authenticate, authorize(['Penjual', 'Pembeli']), getAllProduk);
router.get('/:id', authenticate, authorize(['Penjual', 'Pembeli']), getProdukById);
router.post('/', authenticate, authorize(['Penjual']), createProduk);
router.put('/:id', authenticate, authorize(['Penjual']), updateProduk);
router.delete('/:id', authenticate, authorize(['Penjual']), deleteProduk);

module.exports = router;
