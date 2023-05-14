const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();
const http = require('http').createServer(app);

// setting cors for request
app.use(cors({}));
app.use(cookieParser());

// size request default limit 1mb ==> increasing to 5mb
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(require('./routes'));

// Start the server
const PORT = process.env.PORT_SERVER || 8080;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
