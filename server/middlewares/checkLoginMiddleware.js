const jwt = require("jsonwebtoken");
require('dotenv').config();
const httpHandle = require("../configs/httpHandle");

const checkLoginMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return httpHandle.unauthorized(res, "Auth failed!");
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (err) {
        return httpHandle.unauthorized(res, "Auth failed!");
    }

}

module.exports = checkLoginMiddleware;