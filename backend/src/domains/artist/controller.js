const Artist = require('./model');
const bcrypt = require('bcryptjs');
const createToken = require("./../../util/createToken");
const sendEmail = require('../../util/sendEmail');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const verifyToken = require('./../../middleware/auth');
const catchAsyncError = require('./../../middleware/catchAsyncError');

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
exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find({});
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to handle artist login
exports.loginArtist = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const artist = await Artist.findOne({ username });
      if (!artist || !artist.is_approved) {
        return res.status(401).json({ message: "Invalid credentials or account not approved" });
      }
  
      const isMatch = await bcrypt.compare(password, artist.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Create user token with artistId
      const tokenData = { artistId: artist._id, email: artist.email };
      const token = await createToken(tokenData);
  
      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller function to change artist's password
  exports.changePassword = [
    verifyToken,
    async (req, res) => {
      const { oldPassword, password, confirmPassword } = req.body;
  
      if (!oldPassword || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Please provide old password, new password, and confirm password",
        });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "New password and confirm password do not match",
        });
      }
  
      try {
        const artist = await Artist.findById(req.currentUser.artistId).select("+password");
  
        if (!artist) {
          return res.status(404).json({
            success: false,
            message: "Artist not found",
          });
        }
  
        const isPasswordMatched = await bcrypt.compare(oldPassword, artist.password);
        if (!isPasswordMatched) {
          return res.status(400).json({
            success: false,
            message: "Old password is incorrect",
          });
        }
  
        // Update password hash
        artist.password = await bcrypt.hash(password, 10);
        await artist.save();
  
        // Generate new token with updated credentials
        const tokenData = { artistId: artist._id, email: artist.email };
        const token = await createToken(tokenData);
  
        res.status(200).json({
          success: true,
          message: "Password updated successfully",
          token: token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    },
  ];
  
  module.exports = exports;