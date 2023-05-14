const CommentModel = require("../models/CommentModel");
const httpHandle = require("../configs/httpHandle");

const CommentController = {
    getListComment: async (req, res) => {
        const { postId } = req.body;
        const result = await CommentModel.getListCommentByPostId(postId);
        httpHandle.success(res, result);
    },
}

module.exports = CommentController;