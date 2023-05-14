const express = require('express');
const PostController = require('../controllers/PostController');
const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware');
const ApiConstants = require('../constants/ApiConstants');
const router = express.Router();

router.get(ApiConstants.post.getList, checkLoginMiddleware, PostController.getListPost);
router.get(ApiConstants.post.getListAll, checkLoginMiddleware, PostController.getListPostForAdmin);
router.get(ApiConstants.post.getDetail, checkLoginMiddleware, PostController.getDetailPost);
router.post(ApiConstants.post.like, checkLoginMiddleware, PostController.likePost);
router.post(ApiConstants.post.create, checkLoginMiddleware, PostController.createPosts);
router.put(ApiConstants.post.update, checkLoginMiddleware, PostController.updatePost);
router.put(ApiConstants.post.updateStatus, checkLoginMiddleware, PostController.browsePosts);
router.delete(ApiConstants.post.delete, checkLoginMiddleware, PostController.deletePosts);

module.exports = router;