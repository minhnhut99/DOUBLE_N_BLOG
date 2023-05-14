const CategoriesModel = require("../models/CategoriesModel");
const httpHandle = require("../configs/httpHandle");

const CategoriesController = {
    getListCategory: async (req, res) => {
        try {
            const result = await CategoriesModel.getListCategory();
            httpHandle.success(res, result);
        } catch (error) {
            httpHandle.error(res, error.message);
        }
    },
}

module.exports = CategoriesController;