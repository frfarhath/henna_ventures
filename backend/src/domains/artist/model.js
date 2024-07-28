const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    previous_work: { type: String, required: true }, // File path of the uploaded file
    e_certificate: { type: String, required: true }, // File path of the uploaded file
    nearest_customers: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    username: { type: String },
    password: { type: String }
    
});

module.exports = mongoose.model('Artist', artistSchema);
