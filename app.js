const express = require('express');
const app = express();
const port = 3000;
const http = require("http");
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    console.log('A user connected');
});

app.get('/', (req, res) => {
    
    res.render('index'); // Make sure views/index.ejs exists
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
