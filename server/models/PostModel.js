const connection = require('../configs/database');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const PostModel = {
    getListPost: async () => {
        const strQuery = `SELECT p.p_id, p_title, p_thumbnail, p_desc, 
        (SELECT count(*) FROM comments WHERE comments.p_id = p.p_id) as count_comment, 
        (SELECT count(*) FROM reactions WHERE reactions.p_id = p.p_id) as count_like,
        c_name, u_name, p.created_at
            FROM posts p
            INNER JOIN categories c ON p.c_id = c.c_id
            INNER JOIN users u ON p.u_id = u.u_id
            WHERE p.p_status = 1`;
        const result = await query(strQuery);
        return result;
    },
    getListPostByTitle: async (title) => {
        const strQuery = `SELECT p.p_id, p_title, p_thumbnail, p_desc, 
        (SELECT count(*) FROM comments WHERE comments.p_id = p.p_id) as count_comment, 
        (SELECT count(*) FROM reactions WHERE reactions.p_id = p.p_id) as count_like,
        c_name, u_name, p.created_at
            FROM posts p
            INNER JOIN categories c ON p.c_id = c.c_id
            INNER JOIN users u ON p.u_id = u.u_id
            WHERE p.p_status = 1 AND p_title LIKE '%${title}%'`;
        const result = await query(strQuery);
        return result;
    },
    getListPostByCategory: async (category) => {
        const strQuery = `SELECT p.p_id, p_title, p_thumbnail, p_desc, 
        (SELECT count(*) FROM comments WHERE comments.p_id = p.p_id) as count_comment, 
        (SELECT count(*) FROM reactions WHERE reactions.p_id = p.p_id) as count_like,
        c_name, u_name, p.created_at
            FROM posts p
            INNER JOIN categories c ON p.c_id = c.c_id
            INNER JOIN users u ON p.u_id = u.u_id
            WHERE p.p_status = 1 AND c_name = '${category}'`;
        const result = await query(strQuery);
        return result;
    },
    getListPostByAuthor: async (authorId) => {
        const strQuery = `SELECT p.p_id, p_title, p_thumbnail, p_desc, 
        (SELECT count(*) FROM comments WHERE comments.p_id = p.p_id) as count_comment, 
        (SELECT count(*) FROM reactions WHERE reactions.p_id = p.p_id) as count_like,
        c_name, u_name, p.created_at
            FROM posts p
            INNER JOIN categories c ON p.c_id = c.c_id
            INNER JOIN users u ON p.u_id = u.u_id
            WHERE p.p_status = 1 AND c_name = '${authorId}'`;
        const result = await query(strQuery);
        return result;
    },
    getListPostForAdmin: async () => {
        const strQuery = `SELECT p.p_id, p_title, p_thumbnail, p_desc, 
        (SELECT count(*) FROM comments WHERE comments.p_id = p.p_id) as count_comment,
        (SELECT count(*) FROM reactions WHERE reactions.p_id = p.p_id) as count_like,
        p_status, c_name, u_name, p.created_at
            FROM posts p
            INNER JOIN categories c ON p.c_id = c.c_id
            INNER JOIN users u ON p.u_id = u.u_id`;
        const result = await query(strQuery);
        return result;
    },
    getDetailPost: async (id) => {
        const strQuery = `SELECT p.p_id, p_title, p_thumbnail, p_desc, p_content, p_view, p_status, c_name, p.u_id, u_name, u_email, u_avatar, p.created_at,
            (SELECT count(*) FROM reactions WHERE p_id = ${id}) as count_like
            FROM posts p
            INNER JOIN categories c ON p.c_id = c.c_id
            INNER JOIN users u ON p.u_id = u.u_id
            WHERE p.p_id = ${id}`;
        const result = await query(strQuery);
        return result;
    },
    createPosts: async (data) => {
        const strQuery = `
            INSERT INTO posts(p_title, p_thumbnail, p_desc, p_content, p_status, u_id, c_id)
            VALUES ('${data.title}', '${data.thumbnail}', '${data.desc}', '${data.content}', 0, ${data.userId}, ${data.cateId})
        `;
        const result = await query(strQuery);
        return result;
    },
    updatePosts: async (data) => {
        const strQuery = `
            UPDATE posts
            SET p_title = '${data.title}', p_thumbnail = '${data.thumbnail}', p_desc = '${data.desc}', p_content = '${data.content}', c_id = ${data.cateId}
            WHERE p_id = ${data.id}
        `;
        const result = await query(strQuery);
        return result;
    },
    browsePosts: async (id, status) => {
        const strQuery = `
            UPDATE posts
            SET p_status = ${status}
            WHERE p_id = ${id}
        `;
        const result = await query(strQuery);
        return result;
    },
    deletePost: async (id) => {
        const strQuery = `DELETE FROM posts WHERE p_id = ${id}`;
        const result = await query(strQuery);
        return result;
    },
};

module.exports = PostModel;
