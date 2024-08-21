const User = require("../../user/model");
const RepoModel = require('../../admin/models/repository'); // Assuming this represents designs

// Add a design to the user's collection
exports.addToCollection = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Current user:', req.currentUser);
        
        const { designId } = req.body;
        const userId = req.currentUser.userId;

        console.log('Attempting to find user with ID:', userId);
        
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('User found:', user);

        // Check if the design exists
        const design = await RepoModel.findById(designId);
        if (!design) {
            console.log('Design not found for ID:', designId);
            return res.status(404).json({ message: 'Design not found' });
        }

        console.log('Design found:', design);

        // Check if the design is already in the user's collection
        if (user.collections.includes(designId)) {
            console.log('Design already in collection');
            return res.status(400).json({ message: 'Design already in collection' });
        }

        // Add the design to the user's collection
        user.collections.push(designId);
        await user.save();

        console.log('Design added to collection successfully');
        res.status(200).json({ message: 'Design added to collection successfully' });
    } catch (error) {
        console.error('Detailed error in addToCollection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all designs in the user's collection
exports.getCollection = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.currentUser.userId;

        const user = await User.findById(userId).populate('collections');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Transform the image data into Base64 strings
        const collections = user.collections.map(collection => {
            const base64Image = collection.image.data
                ? `data:${collection.image.contentType};base64,${collection.image.data.toString('base64')}`
                : '';
            return {
                name: collection.name,
                image: base64Image,
                category: collection.category,
            };
        });

        res.status(200).json(collections);
    } catch (error) {
        console.error('Detailed error in getCollection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



// Remove a design from the user's collection
exports.removeFromCollection = async (req, res) => {
    try {
        const userId = req.currentUser.userId;
        const { designId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the design exists in the user's collection
        const index = user.collections.indexOf(designId);
        if (index === -1) {
            return res.status(404).json({ message: 'Design not found in collection' });
        }

        // Remove the design from the user's collection
        user.collections.splice(index, 1);
        await user.save();

        res.status(200).json({ message: 'Design removed from collection successfully' });
    } catch (error) {
        console.error('Detailed error in removeFromCollection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
