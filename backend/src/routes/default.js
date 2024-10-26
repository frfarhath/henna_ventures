const express = require('express');
const storage = require('../domains/admin/helpers/storage');
const router = express.Router();

const { getOrders, updateOrderStatus, deleteOrder} = require("../domains/admin/controllers/order");
const repoController = require('../domains/admin/controllers/repository');
const productController = require('../domains/admin/controllers/product');
const appoinmentController = require('../domains/admin/controllers/appoinment');
const artistController = require('../domains/admin/controllers/artist');

const ReviewController = require('../domains/admin/controllers/review');
const MessageController = require('../domains/admin/controllers/message');


router.post('/repoupload', repoController.postRepo);
router.get('/getrepo', repoController.getRepo);
router.put('/editrepo/:id', repoController.putRepo);
router.delete('/deleterepo/:id', repoController.deleteRepo);

router.post('/addProduct', productController.postProduct);
router.get('/getProduct', productController.getProduct);
router.put('/editProduct/:id', productController.putProduct);
router.put('/stockUpdate/:id', storage, productController.stockUpdate);
router.delete('/deleteProduct/:id', productController.deleteProduct);

router.get('/getAppoinmentPackage', appoinmentController.getAppoinmentPackage);
router.post('/addConfirmAppoinmentPackage',storage, appoinmentController.postConfirmAppoinmentPackage);
router.delete('/deleteAppoinmentPackage/:id', appoinmentController.deleteAppoinmentPackage);
router.get('/getAppoinmentIndividual', appoinmentController.getAppoinmentIndividual);
router.post('/addConfirmAppoinmentIndividual',storage, appoinmentController.postConfirmAppoinmentIndividual);
router.delete('/deleteAppoinmentIndividual/:id', appoinmentController.deleteAppoinmentIndividual);
router.get('/getConfirmAppoinmentPackage', appoinmentController.getConfirmAppoinmentPackage);
router.get('/getConfirmAppoinmentIndividual', appoinmentController.getConfirmAppoinmentIndividual);


router.get('/getArtist', artistController.getArtist);
router.get('/getConfirmArtist', artistController.getConfirmArtist);
router.delete('/deleteArtist/:id', artistController.deleteArtist);

//
router.post('/sendMail',storage, artistController.mail);
router.post('/removeConfirmArtist',storage, artistController.removeConfirmArtist);
//


router.get('/getReview', ReviewController.getReview);
router.delete('/deleteReview/:id', ReviewController.deleteReview);

router.post('/Message', MessageController.Message);
router.get('/getMessage', MessageController.getMessage);
router.post('/addMessage',storage, MessageController.postMessage);
router.put('/messageStatusUpdate/:id', storage, MessageController.statusUpdate);
router.delete('/deleteMessage/:id', MessageController.deleteMessage);

router.get("/getOrder", getOrders);
router.put("/updateOrder/:orderId", updateOrderStatus);
router.delete("/deleteOrder/:orderId", deleteOrder);

module.exports = router;