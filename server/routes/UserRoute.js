const express = require('express');
const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware');
const AuthController = require('../controllers/AuthController');
const ApiConstants = require('../constants/ApiConstants');
const upload = require('../configs/multerConfig');
const router = express.Router();

router.put(ApiConstants.user.update, checkLoginMiddleware, AuthController.updateInfoUser);
router.post(ApiConstants.user.updateAvatar, checkLoginMiddleware, upload.single("file"), AuthController.updateAvatar);
router.delete(ApiConstants.user.delete, checkLoginMiddleware, AuthController.deleteUser);

module.exports = router;