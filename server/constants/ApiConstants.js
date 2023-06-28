module.exports = {
    auth: {
        login: "/login",
        loginGoogle: "/login-google",
        register: "/register",
        forgotPwd: "/forgot-password",
    },
    user: {
        updateAvatar: "/update-avatar",
        update: "/update",
        delete: "/delete/:id",
    },
    post: {
        index: "/post",
        getList: "/get-list",
        getListCategory: "/get-list-cate",
        getListAuthor: "/get-list-author",
        getListTitle: "/get-list-title",
        getListAll: "/get-list-all",
        getDetail: "/get-detail/:id",
        like: "/like",
        create: "/create",
        update: "/update/:id",
        updateStatus: "/update-status/:id",
        delete: "/delete/:id",
    },
    category: '/category',
    comment: {
        index: '/comment',
        getList: "/get-list",
    }
}