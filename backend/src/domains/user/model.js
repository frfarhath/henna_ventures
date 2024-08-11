const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String, // Store image URL or path
        default: null
    },
    address: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    }
    // role: {
    //     type: String,
    //     enum: ['user', 'admin'], 
    //     default: 'user',
    // }
});

module.exports = mongoose.model('User', userSchema);
