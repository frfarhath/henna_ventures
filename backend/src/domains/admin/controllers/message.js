const MessageModel = require('../models/message');

// Create a new message with status set to 1
exports.Message = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        const newMessage = new MessageModel({
            fullName,
            email,
            message,
            status: 0 // Status set to 1 upon creation
        });
        await newMessage.save();
        res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        console.error('Error occurred while submitting the form:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form' });
    }
};

// Get all messages
exports.getMessage = async (req, res) => {
    try {
        const messages = await MessageModel.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
};

// Post a new message with status set to 1
exports.postMessage = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        const newMessage = new MessageModel({
            fullName,
            email,
            message,
            status: 1 // Status set to 1 upon creation
        });

        const createdMessage = await newMessage.save();
        res.status(201).json({
            message: {
                ...createdMessage._doc,
            },
        });
    } catch (error) {
        console.error('Error occurred while submitting the form:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form' });
    }
};

// Update message status to 2 (replied)
// Update message status to 2 (replied)
exports.statusUpdate = async (req, res) => {
    try {
        console.log('Updating status for:', req.params.id, 'to', req.body.status);
        const updatedMessage = await MessageModel.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status // Use dynamic status
            },
            { new: true }
        );
        res.json(updatedMessage);
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(400).json({ message: error.message });
    }
};


// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await MessageModel.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: error.message });
    }
};
