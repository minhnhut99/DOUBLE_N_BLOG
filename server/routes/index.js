const express = require('express');
const ApiConstants = require('../constants/ApiConstants');
const router = new express.Router();

router.use("/auth", require('./AuthRoute'));
router.use("/user", require('./UserRoute'));
router.use(ApiConstants.post.index, require('./PostRoute'));
router.use(ApiConstants.category, require('./CategoriesRoute'));
router.use("/", require('./CommonRoute'));

module.exports = router;
