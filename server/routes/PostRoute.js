const express = require('express');
const PostController = require('../controllers/PostController');
const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware');
const ApiConstants = require('../constants/ApiConstants');
const upload = require('../configs/multerConfig');
const router = express.Router();

router.get(ApiConstants.post.getList, PostController.getListPost);
router.get(ApiConstants.post.getListTitle, PostController.getListPostByTitle);
router.get(ApiConstants.post.getListCategory, PostController.getListPostByCategory);
router.get(ApiConstants.post.getListAuthor, PostController.getListPostByAuthor);
router.get(ApiConstants.post.getListAll, checkLoginMiddleware, PostController.getListPostForAdmin);
router.get(ApiConstants.post.getDetail, PostController.getDetailPost);
router.post(ApiConstants.post.like, checkLoginMiddleware, PostController.likePost);
router.post(ApiConstants.post.create, checkLoginMiddleware, upload.single("file"), PostController.createPosts);
router.put(ApiConstants.post.update, checkLoginMiddleware, upload.single("file"), PostController.updatePost);
router.put(ApiConstants.post.updateStatus, checkLoginMiddleware, PostController.browsePosts);
router.delete(ApiConstants.post.delete, checkLoginMiddleware, PostController.deletePosts);

module.exports = router;