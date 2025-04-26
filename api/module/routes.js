const express = require('express');
const router = express.Router();
const userController = require('./controllers');

router.get('/summary', userController.getSummary);

module.exports = router;