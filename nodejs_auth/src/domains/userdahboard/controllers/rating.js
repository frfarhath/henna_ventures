const Rating = require('../models/rating');

exports.postRate = async (req, res) => {

    const { username } = req.body;
    const { rate } = req.body;
    const { title } = req.body;
    const { review } = req.body;
    const { date} = req.body;

    const blog = new Rating({
        username, rate,title, review,date
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



