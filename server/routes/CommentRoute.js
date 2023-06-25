const express = require('express');
const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware');
const ApiConstants = require('../constants/ApiConstants');
const CommentController = require('../controllers/CommentController');
const router = express.Router();

router.get(ApiConstants.comment.getList, CommentController.getListComments);

module.exports = router;