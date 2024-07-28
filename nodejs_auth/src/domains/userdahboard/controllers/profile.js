const Profile = require('../models/profile');

exports.postProfile = async (req, res) => {

    const { fullname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { password } = req.body;
    const { address } = req.body;

    const blog = new Profile({
        fullname, email, phone, password, address
    });

    const createdBlog = await blog.save();
    res.status(201).json({
        blog: {
            ...createdBlog._doc,
        },
    });

};


exports.getProfile = async (req, res) => {
    const blogs = await Profile.find();
    res.json(blogs);
};




