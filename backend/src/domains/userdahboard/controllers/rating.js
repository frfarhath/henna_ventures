const Rating = require('../models/rating');

exports.postRate = async (req, res) => {
    const { userId, username, profileImage, rate, title, review, date, artist } = req.body;

    const blog = new Rating({
        userId,
        username,
        profileImage,
        rate,
        title,
        review,
        date,
        artist
    });
    
    try {
        const createdBlog = await blog.save();
        res.status(201).json({
            blog: {
                ...createdBlog._doc,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating rating', error: error.message });
    }
};

exports.getAllRatings = async (req, res) => {
    try {
        const blogs = await Rating.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all ratings', error: error.message });
    }
};

exports.getUserRatings = async (req, res) => {
    const { userId } = req.query;
    try {
        const userRatings = await Rating.find({ userId: userId });
        res.json(userRatings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user ratings', error: error.message });
    }
};

exports.deleteRate = async (req, res) => {
    try {
        const deletedPost = await Rating.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.json({ message: 'Rating deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting rating', error: err.message });
    }
};