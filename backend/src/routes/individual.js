const express = require('express');
const storage = require('../domains/helpers/storage');
const router = express.Router();

const collectionController = require('../domains/userdahboard/controllers/collection');
const orderController = require('../domains/userdahboard/controllers/order');
const individualController = require('../domains/userdahboard/controllers/individual');
const packageController = require('../domains/userdahboard/controllers/package');
const ratingController = require('../domains/userdahboard/controllers/rating');
const profileController = require('../domains/userdahboard/controllers/profile');
const artistController = require('../domains/userdahboard/controllers/artist');


router.get('/getIndividual', individualController.getIndividual);
router.post('/', storage, individualController.postIndividual);

router.get('/getPackage', packageController.getPackage);
router.post('/postPackage', storage, packageController.postPackage);

// router.get('/getRating', ratingController.getRate);
// router.post('/postRate', storage, ratingController.postRate);
// router.delete('/deleteRate/:id', ratingController.deleteRate);

router.post('/postRate', ratingController.postRate);
router.get('/getAllRatings', ratingController.getAllRatings);
router.get('/getUserRatings', ratingController.getUserRatings);
router.delete('/deleteRate/:id', ratingController.deleteRate);

router.get('/getProfile', profileController.getProfile);
router.post('/postProfile', storage, profileController.postProfile);
router.put('/updateProfile/:id', storage, profileController.putProfile);
router.get('/findProfile/:id', profileController.findProfile);


router.get('/getCollection', collectionController.getCollection);
router.get('/getOrder', orderController.getOrder);
router.get('/getArtist', artistController.getArtist);


module.exports = router;