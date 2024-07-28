const express = require('express');
const artistController = require('./controller');

const router = express.Router();

router.post('/register', artistController.upload.fields([
    { name: 'previous_work', maxCount: 1 },
    { name: 'e_certificate', maxCount: 1 }
]), artistController.registerArtist);

router.post('/approve/:artistId', artistController.approveArtist);
router.post('/login', artistController.loginArtist);
router.get('/', artistController.getAllArtists);  // Ensure this line is included

module.exports = router;
