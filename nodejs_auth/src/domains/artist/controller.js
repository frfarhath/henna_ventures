const Artist = require('./model');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../util/sendEmail'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

// Multer setup
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'));
    }
};

// Initialize upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

exports.upload = upload;

exports.registerArtist = async (req, res) => {
    try {
        const { full_name, phone, email, location, nearest_customers } = req.body;
        const previous_work = req.files['previous_work'][0].path;
        const e_certificate = req.files['e_certificate'][0].path;

        const newArtist = new Artist({ 
            full_name, phone, email, location, previous_work, e_certificate, nearest_customers 
        });

        await newArtist.save();
        res.status(201).json({ message: 'Artist registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.approveArtist = async (req, res) => {
    try {
        const { artistId } = req.params;
        const { username, password } = req.body;

        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        artist.username = username;
        artist.password = hashedPassword;
        artist.is_approved = true;

        await artist.save();

        // Send email
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: artist.email,
            subject: 'Account Approved',
            text: `Your account has been approved. Your username is ${username} and your password is ${password}`
        };

        await sendEmail(mailOptions);
        res.status(200).json({ message: 'Artist approved and email sent' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.loginArtist = async (req, res) => {
    try {
        const { username, password } = req.body;

        const artist = await Artist.findOne({ username });
        if (!artist || !artist.is_approved) {
            return res.status(401).json({ message: 'Invalid credentials or account not approved' });
        }

        const isMatch = await bcrypt.compare(password, artist.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: artist._id, username: artist.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};