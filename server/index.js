const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const socketManager = require('./socketManager.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

io.on('connection', socketManager);
// var server = require('http').Server(app);
// const io = require('socket.io')(server);
const cors = require('cors');
var userRoutes = require('./routes/userRoutes.js');
var imgRoutes = require('./routes/imageRoutes.js');
var msgRoutes = require('./routes/messageRoutes.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit:10000}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('go to /users');
});

app.use(userRoutes);
app.use(imgRoutes);
app.use(msgRoutes);

// io.on('connection', socket => {
// 	console.log('User connected')
// 	socket.on('disconnect', () => {
// 		console.log('user disconnected')
// 	})
// })

module.exports.io = io;
module.exports.app = app;

server.listen(4000, () => {
	console.log(`Server running on port 4000`)
});
