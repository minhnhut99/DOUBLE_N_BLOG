const express = require('express');
const CommonController = require('../controllers/CommonController');
const router = express.Router();

router.get('/image/:img', CommonController.getImage);

module.exports = router;