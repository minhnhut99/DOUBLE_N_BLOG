const httpHandle = require("../configs/httpHandle");
const fs = require("fs");
const PostModel = require("../models/PostModel");
const ReactionModel = require("../models/ReactionModel");
const { getUrlStogare, renderUrlImage } = require("../utils/utilCommon");

const PostController = {
    getListPost: async (req, res) => {
        try {
            const posts = await PostModel.getListPost();
            const result = posts.map((post) => {
                return {
                    ...post,
                    p_thumbnail: post?.p_thumbnail ? renderUrlImage(post.p_thumbnail) : null
                }
            });
            httpHandle.success(res, result, "Get List Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    getListPostByTitle: async (req, res) => {
        try {
            const { title } = req.query;
            const posts = await PostModel.getListPostByTitle(title);
            const result = posts.map((post) => {
                return {
                    ...post,
                    p_thumbnail: post?.p_thumbnail ? renderUrlImage(post.p_thumbnail) : null
                }
            });
            httpHandle.success(res, result, "Get List Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    getListPostByCategory: async (req, res) => {
        try {
            const { category } = req.query;
            const posts = await PostModel.getListPostByCategory(category);
            const result = posts.map((post) => {
                return {
                    ...post,
                    p_thumbnail: post?.p_thumbnail ? renderUrlImage(post.p_thumbnail) : null
                }
            });
            httpHandle.success(res, result, "Get List Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    getListPostByAuthor: async (req, res) => {
        try {
            const { authorId } = req.query;
            const posts = await PostModel.getListPostByAuthor(authorId);
            const result = posts.map((post) => {
                return {
                    ...post,
                    p_thumbnail: post?.p_thumbnail ? renderUrlImage(post.p_thumbnail) : null
                }
            });
            httpHandle.success(res, result, "Get List Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    getListPostForAdmin: async (req, res) => {
        try {
            if (req.user.u_role === "admin") {
                const posts = await PostModel.getListPostForAdmin();
                const result = posts.map((post) => {
                    return {
                        ...post,
                        p_thumbnail: post?.p_thumbnail ? renderUrlImage(post.p_thumbnail) : null
                    }
                });
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
            const posts = await PostModel.getDetailPost(id);
            const result = posts.length === 0 ? {} :
                {
                    ...posts[0],
                    p_thumbnail: posts[0]?.p_thumbnail ? renderUrlImage(posts[0].p_thumbnail) : null,
                    u_avatar: posts[0]?.u_avatar ? renderUrlImage(posts[0].u_avatar) : renderUrlImage('avatar-default.jpg'),
                }
            httpHandle.success(res, result, "Get Detail Post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
    createPosts: async (req, res) => {
        const file = req.file;
        const url = getUrlStogare(file.filename);
        try {
            const { title, desc, content, cateId } = req.body;
            const { u_id } = req.user;
            const data = {
                title,
                desc,
                content,
                cateId,
                userId: u_id,
                thumbnail: file.filename
            }
            await PostModel.createPosts(data);
            httpHandle.success(res, {}, "Create Post Success!");
        } catch (error) {
            fs.unlink(url, (err) => { });
            httpHandle.error(res, error.message);
        }
    },
    updatePost: async (req, res) => {
        const file = req.file;
        try {
            const { id } = req.params;
            const { title, desc, content, cateId } = req.body;
            const { u_id } = req.user;
            const infoPost = await PostModel.getDetailPost(id);
            if (infoPost[0] && (infoPost[0].u_id === u_id || u_role === "admin")) {
                const dataUpdate = { id, title, thumbnail: infoPost[0].p_thumbnail, desc, content, cateId };
                const oldUrl = getUrlStogare(infoPost[0].p_thumbnail);
                if (file) {
                    dataUpdate.thumbnail = file.filename;
                }
                await PostModel.updatePosts(dataUpdate);
                if (file) {
                    fs.unlink(oldUrl, () => { httpHandle.success(res, {}, "Update Post success!"); });
                } else {
                    httpHandle.success(res, {}, "Update Post success!");
                }
            } else {
                httpHandle.fail(res, "You do not have permission to access");
            }
        } catch (error) {
            if (file) {
                const newUrl = getUrlStogare(file.filename);
                fs.unlink(newUrl, () => { httpHandle.error(res, error.message); });
            } else {
                httpHandle.error(res, error.message);
            }
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
            httpHandle.success(res, {}, "Like post Success!");
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
}

module.exports = PostController;