const Rating = require('../models/rating');

exports.postRate = async (req, res) => {

    const { username } = req.body;
    const { rate } = req.body;
    const { title } = req.body;
    const { review } = req.body;
    const { date} = req.body;
    const { artist} = req.body;

    const blog = new Rating({
        username, rate,title, review,date,artist
    });
    
    const createdBlog = await blog.save();
    res.status(201).json({
        blog: {
            ...createdBlog._doc,
        },
    });

};

exports.getRate = async (req, res) =>{
    const blogs = await Rating.find();
    res.json(blogs);
};

exports.deleteRate = async (req, res) => {

    try {
        const deletedPost = await Rating.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'not found' });
        }
        res.json({ message: 'deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


