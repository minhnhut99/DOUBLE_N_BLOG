require('dotenv').config();
const mysql = require('mysql');

// Set up MySQL connection
const connection = mysql.createConnection({
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAME_DATABASE
});

module.exports = connection;