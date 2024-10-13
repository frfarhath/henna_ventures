const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const artistController = require('./controller');
const verifyToken = require('../middleware/auth');
const authController = require('../middleware/authController');

// Route for changing password
router.put('/password/change', verifyToken, upload.none(), authController.protect, artistController.changePassword);

// Other routes
router.post('/register', artistController.registerArtist);
// router.get('/download', artistController.downloadFile);
router.get('/download/:artistId/:fileType', artistController.downloadFile);
router.post('/login', artistController.loginArtist);
router.get('/artists', artistController.getAllArtists);
router.get('/protected-route', verifyToken, (req, res) => {
    // If token is valid and verified, req.currentUser will contain the decoded token payload
    res.json({ message: 'Access granted', currentUser: req.currentUser });
});

module.exports = router;
