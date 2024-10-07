const ArtistModel = require('../models/artist');
const ConfirmArtistModel = require('../models/confirmArtist');
const ReviewModel = require('../models/review');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const bcrypt = require('bcrypt');


exports.getArtist = async (req, res) => {
    const blogs = await ArtistModel.find();
    res.json(blogs);
};

exports.getConfirmArtist = async (req, res) => {
    const blogs = await ConfirmArtistModel.find();
    res.json(blogs);
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



exports.mail = async (req, res) => {
        try {
            const { id, fullname, phone, email, location, prework, certificate, is_approved, username, password } = req.body;
    
            // Hash the password
             const hashedPassword = await bcrypt.hash(password, 10);
       

            const newArtist = new ConfirmArtistModel({
                fullname,
                phone,
                email,
                location,
                prework,
                certificate,
                is_approved,
                username,
                password: password
            });
    
            const createdArtist = await newArtist.save();
    
            // Delete from ArtistModel if it exists
            if (id) {
                await ArtistModel.findByIdAndDelete(id);
            }
    
            // Email configuration
            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.AUTH_EMAIL,
                    pass: process.env.AUTH_PASS
                }
            }
    
            let transporter = nodemailer.createTransport(config);
    
            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: "Henna Ventures",
                    link: 'https://mailgen.js/'
                }
            })
    
            let response = {
                body: {
                    name: fullname,
                    intro: "Congratulations! You have been selected to join us. Here, you can find your username and password",
                    table: {
                        data: [
                            {
                                username: username,
                                password: password // Note: Sending plain text password in email is not recommended for security reasons
                            }
                        ]
                    },
                    outro: "Thank you."
                }
            }
    
            let mail = MailGenerator.generate(response)
    
            let message = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Selection Confirmation",
                html: mail
            }
    
            await transporter.sendMail(message);
    
            res.status(201).json({ 
                msg: "Artist registered successfully and confirmation email sent",
                artistId: createdArtist._id
            });
    
        } catch (error) {
            console.error("Error in artist registration:", error);
            res.status(500).json({ error: error.message });
        }
    }
exports.removeConfirmArtist = async (req, res) => {

    const { id } = req.body;
    const { fullname } = req.body;

    //review delete
    const deleteReview = await ReviewModel.findByIdAndDelete(id);
    //

    const blogs = await ConfirmArtistModel.find();

    const subArray = [];
    blogs.map((item) => {
        if (item.fullname === fullname) {
            subArray.push(item)
        }
    });


    if (subArray.length == 0) {
        res.status(201).json('The Artist Not Available');
    } else {
        const findId = subArray[0]._id;

        try {
            const deletedPost = await ConfirmArtistModel.findByIdAndDelete(findId);
            if (!deletedPost) {
                return res.status(404).json({ message: 'not found' });
            }
            res.json({ message: 'deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};
