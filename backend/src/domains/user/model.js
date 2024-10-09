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
    },
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'repository', // Refers to the RepoModel
    }],
    userType: {
        type: String,
        enum: ['user', 'artist', 'admin'], // Add all possible user types
        default: 'user',
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);