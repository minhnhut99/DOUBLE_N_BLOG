require('dotenv').config();
const bcrypt = require('bcrypt');
const httpHandle = require('../configs/httpHandle');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const { getUrlStogare } = require('../utils/utilCommon');

const AuthController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await UserModel.getUserByUsername(username);
        if (!user.length) {
            httpHandle.fail(res, 'Invalid username or password');
        } else if (await bcrypt.compare(password, user[0].password)) {
            const info = user[0];
            info.password = undefined;
            const token = jwt.sign({ ...info }, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24 * 5,
            });
            const payload = {
                token,
                user: info,
            };
            httpHandle.success(res, payload, 'Login success!');
        } else {
            httpHandle.fail(res, 'Invalid username or password');
        }
    },

    loginGoogle: async (req, res) => {
        const { credential } = req.body;
        const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

        try {
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.CLIENT_ID_GOOGLE,
            });
            const data = ticket.getPayload();
            const user = await UserModel.getUserByGoogleId(data.sub);
            if (user.length === 1) { // Đã từng đăng nhập bằng tài khoản Google
                const info = user[0];
                const token = jwt.sign({ ...info }, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60 * 24 * 5,
                });
                const payload = {
                    token,
                    user: info,
                };
                httpHandle.success(res, payload, 'Login success!');
            } else { // Chưa từng đăng nhập bằng tài khoản Google
                const dataUserCreate = {
                    google_id: data.sub,
                    name: data.name,
                    email: data.email,
                    picture: data.picture
                };
                const resUser = await UserModel.createUserByGoogle(dataUserCreate);
                const newUser = {
                    u_id: resUser.insertId,
                    u_avatar: data.picture,
                    u_name: data.name,
                    u_role: 'user',
                    u_phone: '',
                    u_gender: 'male',
                    u_email: data.email,
                    u_address: '',
                    u_birthday: ''
                };
                const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY, {
                    expiresIn: data.exp - data.iat,
                });
                const payload = {
                    token,
                    user: newUser,
                };
                httpHandle.success(res, payload, 'Login success!');
            }
        } catch (error) {
            httpHandle.fail(res, 'Invalid username or password');
        }
    },

    register: async (req, res) => {
        try {
            const { username, password, email, name, gender, birthday, address, phone } = req.body;
            const user = await UserModel.getUserByUsername(username);
            if (user.length > 0) {
                return httpHandle.fail(res, "username already exists!");
            }
            const salt = await bcrypt.genSalt();
            const hashPwd = await bcrypt.hashSync(password, salt);
            await UserModel.register({
                username,
                password: hashPwd,
                name,
                email,
                gender,
                birthday,
                address,
                phone
            });
            httpHandle.success(res, {}, 'Register Account Success!');
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    updateInfoUser: async (req, res) => {
        try {
            const { id, email, name, gender, birthday, address, phone } = req.body;
            if (req.user.u_role === "admin" || req.user.u_id === id) {
                const data = {
                    id,
                    name,
                    email,
                    gender,
                    birthday,
                    address,
                    phone,
                }
                await UserModel.updateUser(data);
                httpHandle.success(res, { data }, 'Updata User Success!');
            } else {
                httpHandle.forbidden(res, "You do not have permission to access");
            }
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    updateAvatar: async (req, res) => {
        const file = req.file;
        const url = getUrlStogare(file.filename);
        try {
            const user = await UserModel.getUserById(req.user.u_id);
            const prevAvatar = getUrlStogare(user[0].u_avatar);
            if (user[0].u_avatar !== "avatar-default.jpg" && (await fs.existsSync(prevAvatar))) {
                fs.unlink(prevAvatar, (err) => {
                    if (err) throw err;
                });
            }
            await UserModel.updateAvatarUser(req.user.u_id, file.filename);
            const result = { ...user[0], u_avatar: file.filename };
            httpHandle.success(res, result, 'Register Account Success!');
        } catch (error) {
            fs.unlink(url, (err) => { });
            httpHandle.error(res, error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            if (req.user.u_role === "admin") {
                const user = await UserModel.getUserById(req.user.u_id);
                const url = getUrlStogare(user[0].u_avatar);
                await UserModel.deleteUser(id);
                if (user[0].u_avatar !== "avatar-default.jpg" && (await fs.existsSync(url))) {
                    fs.unlink(url, (err) => {
                        if (err) throw err;
                    });
                }
                httpHandle.success(res, {}, "Delete User Success!");
            } else {
                httpHandle.forbidden(res, "You do not have permission to access");
            }
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    }
};

module.exports = AuthController;
