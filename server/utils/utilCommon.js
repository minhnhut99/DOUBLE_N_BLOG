require('dotenv').config();
const path = require('path');

const getUrlStogare = (name) => {
    const rootPath = __dirname.slice(0, -5);
    return path.join(rootPath, process.env.PATH_IMAGE + '/' + name);
}
module.exports = {
    getUrlStogare,
}