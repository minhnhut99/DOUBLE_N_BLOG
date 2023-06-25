require('dotenv').config();
const path = require('path');

const getUrlStogare = (name) => {
    const rootPath = __dirname.slice(0, -5);
    return path.join(rootPath, process.env.PATH_IMAGE + '/' + name);
}

const renderUrlImage = (filename) => {
    return process.env.URL_SERVER + 'image/' + filename;
}

const getListComment = (comments, parentId) => {
    const listRootComment = comments.filter(({ c_parent }) => c_parent === parentId);
    const listOtherComment = comments.filter(({ c_parent }) => c_parent !== parentId);
    const result = listRootComment.map((comment) => {
        return {
            ...comment,
            u_avatar: process.env.URL_SERVER + 'image/' + comment.u_avatar,
            childrens: getListComment(listOtherComment, comment.c_id),
        }
    });
    return result;
}

module.exports = {
    getUrlStogare,
    renderUrlImage,
    getListComment,
}