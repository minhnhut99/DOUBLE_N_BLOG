const fs = require('fs');
require('dotenv').config();
const httpHandle = require('../configs/httpHandle');
const { getUrlStogare } = require('../utils/utilCommon');

const CommonController = {
    getImage: async (req, res) => {
        const { img } = req.params;
        const pathImg = getUrlStogare(img);

        if (await fs.existsSync(pathImg)) {
            const stat = fs.statSync(pathImg);
            const fileSize = stat.size;
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': fileSize,
            });
            const readStream = fs.createReadStream(pathImg);
            readStream.pipe(res);
            // res.sendFile(pathImg);
        } else {
            const pathDefault = getUrlStogare('default-image.jpg');
            const stat = fs.statSync(pathDefault);
            const fileSize = stat.size;
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': fileSize,
            });
            const readStream = fs.createReadStream(pathDefault);
            readStream.pipe(res);
        }
    }
};

module.exports = CommonController;