const User = require("../../user/model");
const RepoModel = require('../../admin/models/repository'); // Assuming this represents designs

exports.addToCollection = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Current user:', req.currentUser);
        
        const { designId } = req.body;
        const userId = req.currentUser.userId;

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ message: 'User not found' });
        }
        
        const design = await RepoModel.findById(designId);
        if (!design) {
            console.log('Design not found for ID:', designId);
            return res.status(404).json({ message: 'Design not found' });
        }

        if (user.collections.includes(designId)) {
            console.log('Design already in collection');
            return res.status(400).json({ message: 'Design already in collection' });
        }

        user.collections.push(designId);
        await user.save();

        console.log('Design added to collection successfully');
        res.status(200).json({ message: 'Design added to collection successfully' });
    } catch (error) {
        console.error('Detailed error in addToCollection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getCollection = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.currentUser.userId;

        const user = await User.findById(userId).populate({
            path: 'collections',
            model: RepoModel
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const collections = user.collections.map(design => ({
            _id: design._id,
            name: design.name,
            image: design.image, // Assuming image is stored as a URL or path
            category: design.category,
        }));

        res.status(200).json(collections);
    } catch (error) {
        console.error('Detailed error in getCollection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.removeFromCollection = async (req, res) => {
    try {
        const userId = req.currentUser.userId;
        const { designId } = req.params;

        console.log(`Attempting to remove design ${designId} for user ${userId}`);

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the design exists in the user's collection
        const index = user.collections.indexOf(designId);
        if (index === -1) {
            console.log('Design not found in collection');
            return res.status(404).json({ message: 'Design not found in collection' });
        }

        // Remove the design from the user's collection
        user.collections.splice(index, 1);
        await user.save();

        console.log('Design removed successfully');
        res.status(200).json({ message: 'Design removed from collection successfully' });
    } catch (error) {
        console.error('Error in removeFromCollection:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};