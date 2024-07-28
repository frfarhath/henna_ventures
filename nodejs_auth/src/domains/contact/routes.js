const express = require('express');
const { createContact } = require('./controller');
const router = express.Router();

router.post('/contact', (req, res, next) => {
  // console.log('Received a POST request to /contact');
  next();
}, createContact);

module.exports = router;
