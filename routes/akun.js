const express = require('express');
const router = express.Router();
const {
  registerAkun,
  loginAkun,
  getAllAkun,
  getAkunById,
  createAkun,
  updateAkun,
  deleteAkun
} = require('../controllers/akunController');
const { authenticate, authorize } = require('../middleware/auth');

// Rute register akun
router.post('/register', registerAkun);

// Rute login akun
router.post('/login', loginAkun);

// Rute mendapatkan semua akun
router.get('/', authenticate, authorize(['Penjual', 'Pembeli']), getAllAkun);

// Rute mendapatkan akun berdasarkan ID
router.get('/:id', authenticate, authorize(['Penjual', 'Pembeli']), getAkunById);

// Rute membuat akun baru
router.post('/', authenticate, authorize(['Penjual']), createAkun);

// Rute memperbarui akun
router.put('/:id', authenticate, authorize(['Penjual']), updateAkun);

// Rute menghapus akun
router.delete('/:id', authenticate, authorize(['Penjual']), deleteAkun);

module.exports = router;
