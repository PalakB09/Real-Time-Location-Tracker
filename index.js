const express = require('express');
const app = express();
const port = 3000;
const http=require("http");
const server=http.createServer(app);
const socketio = require('socket.io');
const io=socketio(server);


app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

server.listen(port);
console.log(`Server running at http://localhost:${port}`);