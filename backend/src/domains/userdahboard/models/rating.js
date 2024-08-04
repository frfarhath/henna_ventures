const mongoose = require('mongoose')
const ratingSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    profileImage: {
            type: String, // Store image URL or path
            required: true
        
    },
    rate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model('Rating', ratingSchema);
