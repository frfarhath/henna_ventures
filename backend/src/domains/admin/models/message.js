const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the message
const messageSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0 // Default status is 0 (pending)
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
const MessageModel = mongoose.model('Message', messageSchema);
module.exports = MessageModel;
