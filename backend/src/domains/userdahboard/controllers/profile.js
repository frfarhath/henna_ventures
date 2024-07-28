const Profile = require('../models/profile');
const bcrypt = require('bcryptjs');

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

exports.putProfile = async (req, res) => {
    try {

        const updatedPost = await Profile.findByIdAndUpdate(
            req.params.id,
            {
                fullname: req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                password: await bcrypt.hash(req.body.password , 10),
                address: req.body.address,
            },
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.findProfile = async (req, res) => {
    try {
        const find = await Profile.findById(req.params.id);
        res.json(find);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
