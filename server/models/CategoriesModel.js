const connection = require("../configs/database");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const CategoriesModel = {
    getListCategory: async () => {
        const strQuery = `SELECT * FROM categories`;
        const result = await query(strQuery);
        return result;
    }
}
module.exports = CategoriesModel;