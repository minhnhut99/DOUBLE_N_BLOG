const httpHandle = require("../configs/httpHandle");
const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");
const ReactionModel = require("../models/ReactionModel");

const PostController = {
    getListPost: async (req, res) => {
        try {
            const result = await PostModel.getListPost();
            httpHandle.success(res, result, "Get List Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    getListPostForAdmin: async (req, res) => {
        try {
            if (req.user.u_role === "admin") {
                const result = await PostModel.getListPostForAdmin();
                httpHandle.success(res, result, "Get List Post Success!");
            } else {
                httpHandle.forbidden(res, "You do not have permission to access");
            }
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    getDetailPost: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await PostModel.getDetailPost(id);
            httpHandle.success(res, result[0] ?? {}, "Get Detail Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    createPosts: async (req, res) => {
        try {
            const { title, desc, content, cateId } = req.body;
            const { u_id } = req.user;
            const data = {
                title,
                desc,
                content,
                cateId,
                userId: u_id
            }
            await PostModel.createPosts(data);
            httpHandle.success(res, {}, "Create Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, desc, content, cateId } = req.body;
            const { u_id } = req.user;
            const infoPost = await PostModel.getDetailPost(id);
            if (infoPost[0] && (infoPost[0].u_id === u_id || u_role === "admin")) {
                await PostModel.updatePosts({ id, title, desc, content, cateId });
                httpHandle.success(res, {}, "Update Post success!");
            } else {
                httpHandle.fail(res, "You do not have permission to access");
            }
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    browsePosts: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (req.user.u_role === "admin") {
                await PostModel.browsePosts(id, status);
                httpHandle.success(res, {}, "Update Status Post Success!");
            } else {
                httpHandle.fail(res, "You do not have permission to access");
            }
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    deletePosts: async (req, res) => {
        try {
            const { id } = req.params;
            const { u_id } = req.user;
            const infoPost = await PostModel.getDetailPost(id);
            if (infoPost[0] && (infoPost[0].u_id === u_id || u_role === "admin")) {
                await PostModel.deletePost(id);
                httpHandle.success(res, {}, "Delete Post success!");
            } else {
                httpHandle.fail(res, "You do not have permission to access");
            }
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    likePost: async (req, res) => {
        try {
            const { userId, postId } = req.body;
            const reaction = await ReactionModel.getReactionByUserId(postId, userId);
            if (reaction.length) {
                await ReactionModel.deleteReaction(postId, userId);
            } else {
                await ReactionModel.createReaction(postId, userId);
            }
            httpHandle.success(res, {}, "Like post Success!")
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
}

module.exports = PostController;