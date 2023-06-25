const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const CommentModel = require('./models/CommentModel');
const { getListComment } = require('./utils/utilCommon');

// setting cors for request
app.use(cors({}));
app.use(cookieParser());

// size request default limit 1mb ==> increasing to 5mb
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(require('./routes'));


// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(http, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('join_room', async (data) => {
        const { postId } = data;
        socket.join(postId);
    });

    socket.on('send_message', async (data) => {
        const { postId, content, p_parent, userId } = data;
        const payload = {
            postId,
            parent: p_parent,
            content: content,
            userId
        };
        await CommentModel.createComment(payload);
        const comments = await CommentModel.getListCommentByPostId(postId);
        const result = getListComment(comments, null);
        socket.to(postId).emit('receive_message', result);
    });
});

// Start the server
const PORT = process.env.PORT_SERVER || 8080;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
