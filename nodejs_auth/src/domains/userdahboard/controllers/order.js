const OrderModel = require('../models/order');

exports.getOrder = async (req, res) => {
    const blogs = await OrderModel.find();
    res.json(blogs);
};