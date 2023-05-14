const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const router = express.Router();

router.get('/', CategoriesController.getListCategory);

module.exports = router;