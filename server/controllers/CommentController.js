const CommentModel = require("../models/CommentModel");
const { getListComment } = require("../utils/utilCommon");
const httpHandle = require("../configs/httpHandle");

const CommentController = {
    getListComments: async (req, res) => {
        const { postId } = req.query;
        const comments = await CommentModel.getListCommentByPostId(postId);
        const result = getListComment(comments, null);
        httpHandle.success(res, result);
    },
    createComment: async (req, res) => {
        const { p_id, c_content, parentId } = req.body;
        const { u_id } = req.user;
        const data = {
            postId: p_id,
            content: c_content,
            userId: u_id,
            parent: parentId
        };
        await CommentModel.createComment(data);
        return;
    }
}

module.exports = CommentController;