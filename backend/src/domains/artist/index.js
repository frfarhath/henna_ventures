// routes/index.js
const express = require('express');
const artistController = require('./controller');
const verifyToken = require('./../../middleware/auth'); // Import the middleware for token verification

const router = express.Router();

router.post('/register', artistController.upload.fields([
    { name: 'previous_work', maxCount: 1 },
    { name: 'e_certificate', maxCount: 1 }
]), artistController.registerArtist);
router.get('/download/:artistId/:fileType', artistController.downloadFile);
router.post('/approve/:artistId', artistController.approveArtist);
router.post('/login', artistController.loginArtist);
router.get('/', artistController.getAllArtists); // Ensure this line is included
router.put('/password/change', verifyToken, artistController.changePassword); // Update this line to use PUT method and verifyToken middleware

module.exports = router;
