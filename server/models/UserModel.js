const connection = require("../configs/database");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const UserModel = {
    getUserByUsername: async (name) => {
        const result = await query(`SELECT * FROM users WHERE u_email = '${name}'`);
        return result;
    },

    register: async (data) => {
        try {
            connection.beginTransaction();
            const strQueryNewUser = `
            INSERT INTO users (u_name, u_age, u_gender, u_email, u_birthday, u_address)
            VALUES ('${data.name}', ${data.age}, '${data.gender}', '${data.email}', '${data.birthday}', '${data.address}');
        `;
            const newUser = await query(strQueryNewUser);
            const sqlQueryAccount = `
            INSERT INTO accounts (username, password, u_id)
            VALUES ('${data.username}', '${data.password}', ${newUser.insertId});
        `;
            await query(sqlQueryAccount);
            connection.commit();
            connection.end();
            return newUser;
        } catch (error) {
            connection.rollback();
            throw error;
        }
    }

}

module.exports = UserModel;