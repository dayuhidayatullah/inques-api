const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/upload');

// Define the upload route
router.post('/upload', uploadFile);

module.exports = router;