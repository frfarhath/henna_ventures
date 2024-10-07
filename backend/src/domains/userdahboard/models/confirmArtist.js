const mongoose = require('mongoose');

const ConfirmArtistSchema = mongoose.Schema({

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
        required: true
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
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
})

module.exports = mongoose.model('confirmartists', ConfirmArtistSchema)