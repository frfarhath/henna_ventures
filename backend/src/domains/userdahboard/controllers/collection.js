const CollectionModel = require('../models/collection');

exports.getCollection = async (req, res) => {
    const blogs = await CollectionModel.find();
    res.json(blogs);
};