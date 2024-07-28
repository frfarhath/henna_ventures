const express = require('express');
const storage = require('../domains/userdahboard/helpers/storage');
const router = express.Router();

const individualController = require('../domains/userdahboard/controllers/individual');
const packageController = require('../domains/userdahboard/controllers/package');
const ratingController = require('../domains/userdahboard/controllers/rating');
const profileController = require('../domains/userdahboard/controllers/profile');

const Profile = require('../domains/userdahboard/models/profile');
const Rating = require('../domains/userdahboard/models/rating');


router.get('/getIndividual', individualController.getIndividual);
router.post('/', storage, individualController.postIndividual);

router.get('/getPackage', packageController.getPackage);
router.post('/postPackage', storage, packageController.postPackage);

router.get('/getRating', ratingController.getRate);
router.post('/postRate', storage, ratingController.postRate);
router.delete('/deleteRate/:id', async (req, res) => {
    try {
        const deletedPost = await Rating.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Rate not found' });
        }
        res.json({ message: 'Rate deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/getProfile', profileController.getProfile);
router.post('/postProfile', storage, profileController.postProfile);
router.put('/updateProfile/:id', async (req, res) => {
    try {
        const updatedPost = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;