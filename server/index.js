const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const connection = require("./configs/database");
const app = express();

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    } else {
        console.log('Connected to MySQL database');
    }
});

// setting cors for request
app.use(cors({}));
app.use(cookieParser());

// size request default limit 1mb ==> increasing to 5mb
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(require('./routes/index'));

// // Define routes
// app.get('/', (req, res) => {
//     connection.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             console.error('Error executing MySQL query:', err);
//             res.status(500).send('Error fetching data from database');
//             return;
//         }
//         res.json(results);
//     });
// });

// Start the server
const PORT = process.env.PORT_SERVER || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
