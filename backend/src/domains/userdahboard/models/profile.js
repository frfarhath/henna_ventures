const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profileSchema = mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
    
});

profileSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

module.exports = mongoose.model('Profile', profileSchema);
