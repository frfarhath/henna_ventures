const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ConfirmArtistSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    prework: {
        data: Buffer,
        contentType: String
    },
    certificate: {
        data: Buffer,
        contentType: String
    },
    is_approved: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

ConfirmArtistSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

ConfirmArtistSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('Comparing passwords');
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Password match result:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};
module.exports = mongoose.model('ConfirmArtist', ConfirmArtistSchema);