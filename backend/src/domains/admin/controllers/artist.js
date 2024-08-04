const ArtistModel = require('../models/artist');
const ConfirmArtistModel = require('../models/confirmArtist');

exports.getArtist = async (req, res) => {
    const blogs = await ArtistModel.find();
    res.json(blogs);
};

exports.getConfirmArtist = async (req, res) => {
    const blogs = await ConfirmArtistModel.find();
    res.json(blogs);
};

exports.postConfirmArtist = async (req, res) => {

    const { fullname } = req.body;
    const { phone } = req.body;
    const { email } = req.body;
    const { location } = req.body;
    const { prework} = req.body;
    const { certificate } = req.body;
    const { is_approved } = req.body;
    const { username } = req.body;
    const { password } = req.body;

    const blog = new ConfirmArtistModel({
        fullname, phone,email, location,prework,certificate, is_approved,username,password
    });
    
    const createdBlog = await blog.save();
    res.status(201).json({
        blog: {
            ...createdBlog._doc,
        },
    });

};

exports.deleteArtist = async (req, res) => {

    try {
        const deletedPost = await ArtistModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'not found' });
        }
        res.json({ message: 'deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};