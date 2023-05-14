const fs = require('fs');
require('dotenv').config();
const httpHandle = require('../configs/httpHandle');
const { getUrlStogare } = require('../utils/utilCommon');

const CommonController = {
    getImage: async (req, res) => {
        const { img } = req.params;
        const pathImg = getUrlStogare(img);
        if (await fs.existsSync(pathImg)) {
            res.sendFile(pathImg);
        } else {
            httpHandle.fail(res, "File not Exits");
        }
    }
};

module.exports = CommonController;