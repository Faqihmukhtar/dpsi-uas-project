const mongoose = require('mongoose');

const akunSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists'],
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    role: { 
        type: String, 
        enum: ['Penjual', 'Pembeli'], 
        required: [true, 'Role is required']
    }
});

const Akun = mongoose.model('Akun', akunSchema);
module.exports = Akun;
