const ConfirmArtistModel = require('../models/confirmArtist')

exports.getArtist = async (req, res) => {
    const blogs = await ConfirmArtistModel.find();
    res.json(blogs);
};