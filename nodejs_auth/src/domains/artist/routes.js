const express = require('express');
const router = express.Router();
const artistController = require('./controller');

router.post('/register', artistController.registerArtist);
router.post('/approve/:artistId', artistController.approveArtist);

module.exports = router;
