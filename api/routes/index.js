const express = require('express');
const router = express.Router();
const userRoutes = require('../module/routes');

// Mount routes
router.use('/v1', userRoutes);

module.exports = router;