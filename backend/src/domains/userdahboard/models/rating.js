const mongoose = require('mongoose')
const ratingSchema = mongoose.Schema({

    username: {
        type: String,
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
    }
    
});

module.exports = mongoose.model('Rating', ratingSchema);
