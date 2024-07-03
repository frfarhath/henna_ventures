const Package = require('../models/package');

exports.postPackage = async (req, res) => {

    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { address} = req.body;
    const { city } = req.body;
    const { district } = req.body;
    const { time } = req.body;
    const { wedding } = req.body;
    const { design } = req.body;
    const { package_type } = req.body;

    const blog = new Package({
        firstname, lastname,email, phone,address,city, district, time, wedding,design,package_type
    });
    
    const createdBlog = await blog.save();
    res.status(201).json({
        blog: {
            ...createdBlog._doc,
        },
    });

};


exports.getPackage = async (req, res) =>{
    const blogs = await Package.find();
    res.json(blogs);
};



