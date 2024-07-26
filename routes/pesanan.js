const express = require('express');
const router = express.Router();
const { getAllPesanan, getPesananById, createPesanan, updatePesanan, deletePesanan } = require('../controllers/pesananController');
const { authenticate, authorize } = require('../middleware/auth');

// Rute CRUD dengan middleware dan pengontrol
router.get('/', authenticate, authorize(['Penjual', 'Pembeli']), getAllPesanan);
router.get('/:id', authenticate, authorize(['Penjual', 'Pembeli']), getPesananById);
router.post('/', authenticate, authorize(['Pembeli']), createPesanan);
router.put('/:id', authenticate, authorize(['Pembeli']), updatePesanan);
router.delete('/:id', authenticate, authorize(['Pembeli']), deletePesanan);

module.exports = router;
