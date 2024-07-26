const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const { authenticate, authorize } = require('../middleware/auth');

// CRUD routes for Admin
router.post('/admin', authenticate, authorize(['admin']), adminController.createAdmin);
router.post('/admin/login', adminController.login);

// Example of a protected route for admin
router.get('/admin/protected', authenticate, authorize(['admin']), (req, res) => {
  res.send('This is a protected route for admin');
});

module.exports = router;
