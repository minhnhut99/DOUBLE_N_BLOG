module.exports = {
    auth: {
        login: "/login",
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
        getListAll: "/get-list-all",
        getDetail: "/get-detail/:id",
        like: "/like",
        create: "/create",
        update: "/update/:id",
        updateStatus: "/update-status/:id",
        delete: "/delete/:id",
    },
    category: '/category'
}