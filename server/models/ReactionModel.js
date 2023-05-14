const connection = require("../configs/database");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const ReactionModel = {
    getReactionByUserId: async (postId, userId) => {
        const strQuery = `SELECT * FROM reactions WHERE p_id = ${postId} AND u_id = ${userId}`;
        const result = await query(strQuery);
        return result;
    },
    createReaction: async (postId, userId) => {
        const strQuery = `INSERT INTO reactions(p_id, u_id) VALUES (${postId}, ${userId})`;
        await query(strQuery);
    },
    deleteReaction: async (postId, userId) => {
        const strQuery = `DELETE FROM reactions WHERE p_id = ${postId} AND u_id = ${userId}`;
        await query(strQuery);
    },
}

module.exports = ReactionModel;