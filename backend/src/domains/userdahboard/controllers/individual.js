const Individual = require('../models/individual');

exports.postIndividual = async (req, res) => {

    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { address1} = req.body;
    const { address2 } = req.body;
    const { city } = req.body;
    const { district } = req.body;
    const { time } = req.body;
    const { wedding } = req.body;
    const { type_mehendi } = req.body;
    const { design } = req.body;
    const { mehendi_on } = req.body;
    const { mehendi_for } = req.body;

    const blog = new Individual({
        firstname, lastname,email, phone,address1, address2, city, district, time, wedding, type_mehendi, design,mehendi_on,mehendi_for
    });
    
    const createdBlog = await blog.save();
    res.status(201).json({
        blog: {
            ...createdBlog._doc,
        },
    });

};


exports.getIndividual = async (req, res) =>{
    const blogs = await Individual.find();
    res.json(blogs);
};



