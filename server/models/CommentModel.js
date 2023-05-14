const connection = require("../configs/database");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const CommentModel = {
    getListCommentByPostId: async (postId) => {
        const strQuery = `SELECT * FROM comments WHERE p_id = ${postId}`;
        const result = await query(strQuery);
        return result;
    },
    createComment: async (data) => {
        const strQuery = `INSERT INTO comments(c_content, u_id, c_parent, p_id)
        VALUES ('${data.content}', ${data.userId}, ${data.parent ? data.parent : null}, ${data.postId})`;
        await query(strQuery);
        return;
    },
    deleteComment: async (id) => {
        const strQuery = `
            DELETE FROM comments WHERE c_id = ${id}
        `;
        await query(strQuery);
        return;
    }
}
module.exports = CommentModel;