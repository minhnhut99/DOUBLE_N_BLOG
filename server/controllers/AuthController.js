require('dotenv').config();
const bcrypt = require('bcrypt');
const httpHandle = require('../configs/httpHandle');
const UserModel = require("../models/UserModel");

const AuthController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        const user = UserModel.getUserByUsername(username);
        if (!user) {
            httpHandle.unauthorized(res, 'Invalid username or password');
        }
        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            const payload = {
                token,
                username
            }

            res.json({ token });
            httpHandle.success(res, payload, "Login success!");
        } else {
            httpHandle.unauthorized(res, 'Invalid username or password');
        }

    },
    register: async (req, res) => {
        try {
            const { username, password, email, name, age, gender, birthday, address } = req.body;
            const salt = await bcrypt.genSalt();
            const hashPwd = await bcrypt.hashSync(password, salt);
            console.log(hashPwd);
            const result = await UserModel.register({ username, password: hashPwd, name, age, email, gender, birthday, address });
            httpHandle.success(res, { result }, 'Register Account Success!');
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    }
}

module.exports = AuthController;