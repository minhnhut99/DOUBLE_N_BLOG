const express = require('express');
const AuthController = require('../controllers/AuthController');
const ApiConstants = require('../constants/ApiConstants');
const router = new express.Router();

router.post(ApiConstants.auth.login, AuthController.login);
router.post(ApiConstants.auth.loginGoogle, AuthController.loginGoogle);
router.post(ApiConstants.auth.register, AuthController.register);

module.exports = router;