const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

const app = express();

const server = http.createServer(app);

const io = socketIO(server)

// var server = require('http').Server(app);
// const io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');
var userRoutes = require('./routes/userRoutes.js');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('go to /users');
});

app.use(userRoutes);


io.on('connection', socket => {
	console.log('User connected')
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
})

server.listen(4000, () => {
	console.log(`Server running on port 4000`)
});
