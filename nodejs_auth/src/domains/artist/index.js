const express = require('express');
const router = express.Router();
const artistController = require('./controller');

router.post('/register', artistController.upload.fields([
    { name: 'previous_work', maxCount: 1 },
    { name: 'e_certificate', maxCount: 1 }
]), artistController.registerArtist);

router.post('/approve/:artistId', artistController.approveArtist);
router.post('/login', artistController.loginArtist);

module.exports = router;
