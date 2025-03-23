const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');

const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

   
    socket.on("sendLocation", (data) => {
        console.log(`Received location from ${socket.id}:`, data);

       
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        io.emit("remove-marker", { id: socket.id });
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(port, "0.0.0.0", () => {
    console.log(`Server running at ${port}`);
});

