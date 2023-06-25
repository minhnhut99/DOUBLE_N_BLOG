const connection = require("../configs/database");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const UserModel = {
    getUserByUsername: async (name, password) => {
        const strQuery = `
            SELECT u.u_id, password, u_name, u_gender, u_email, u_birthday, u_address, u_avatar, u_phone, u_role
            FROM users u INNER JOIN accounts a ON u.u_id = a.u_id 
            WHERE username = '${name}'
        `;
        const result = await query(strQuery);
        return result;
    },

    getUserByGoogleId: async (id) => {
        const strQuery = `
            SELECT u_id, u_name, u_gender, u_email, u_birthday, u_address, u_avatar, u_phone, u_role 
            FROM users WHERE google_id='${id}'
            `;
        const result = await query(strQuery);
        return result;
    },

    getUserById: async (id) => {
        const strQuery = `SELECT * FROM users WHERE u_id = ${id}`;
        const result = await query(strQuery);
        return result;
    },

    createUserByGoogle: async (data) => {
        const strQueryNewUser = `
                INSERT INTO users (u_name, u_gender, u_phone, u_email, u_address, u_role, u_avatar, google_id)
                VALUES ('${data.name}', 'male', '', '${data.email}', '', 'user', '${data.picture}', '${data.google_id}');
            `;
        const newUser = await query(strQueryNewUser);
        return newUser;
    },

    register: async (data) => {
        try {
            connection.beginTransaction();
            const strQueryNewUser = `
                INSERT INTO users (u_name, u_gender, u_phone, u_email, u_birthday, u_address, u_role, u_avatar)
                VALUES ('${data.name}', '${data.gender}', '${data.phone}', '${data.email}', '${data.birthday}', '${data.address}', 'user', 'avatar-default.jpg');
            `;
            const newUser = await query(strQueryNewUser);
            const sqlQueryAccount = `
                INSERT INTO accounts (username, password, u_id)
                VALUES ('${data.username}', '${data.password}', ${newUser.insertId});
            `;
            await query(sqlQueryAccount);
            connection.commit();
            return newUser;
        } catch (error) {
            connection.rollback();
            throw new Error(error);
        }
    },

    updateUser: async (data) => {
        const strQueryNewUser = `
            UPDATE users 
            SET u_name = '${data.name}', u_gender = '${data.gender}', 
                u_phone = '${data.phone}', u_email = '${data.email}', u_birthday = '${data.birthday}', 
                u_address = '${data.address}', updated_at = now()
            WHERE u_id = ${data.id}
            `;
        const newUser = await query(strQueryNewUser);
        return newUser;
    },

    updateAvatarUser: async (id, filename) => {
        const strQuery = `
            UPDATE users SET u_avatar = '${filename}' WHERE u_id= ${id}
        `;
        await query(strQuery);
    },

    deleteUser: async (id) => {
        const strQuery = `
            DELETE FROM users WHERE u_id= ${id}
        `;
        await query(strQuery);
    },

}

module.exports = UserModel;