const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    previous_work: {
        data: Buffer,
        contentType: String,
        filename: String
    },
    e_certificate: {
        data: Buffer,
        contentType: String,
        filename: String
    },
    nearest_customers: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    username: { type: String, sparse: true, unique: true },
    password: { type: String }
});

module.exports = mongoose.model('Artist', artistSchema);
