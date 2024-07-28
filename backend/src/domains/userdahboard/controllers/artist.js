const ArtistModel = require('../models/artist');

exports.getArtist = async (req, res) => {
    const blogs = await ArtistModel.find();
    res.json(blogs);
};