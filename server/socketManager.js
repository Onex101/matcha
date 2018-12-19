const socketIO = require('./index.js');
const {VERIFY_USER, USER_CONNECTED, LOGOUT} = require('../client/src/Events')
const {createUser, creatMessage, createChat} = require('../client/src/Factories')

let connectedUsers = {}
module.exports = function(socket){
	console.log("Socket Id: " + socket.id);

	socket.on(VERIFY_USER, (nickname, callback)=>{
		if (isUser(connectedUsers, nickname)){
			callback({isUser: true, user:null});
		}
		else{
			callback({isUser: false, user:createUser({name: nickname})})
		}
	})

	socket.on(USER_CONNECTED, (user)=>{
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user
		socketIO.io.emit(USER_CONNECTED, connectedUsers)
		console.log(connectedUsers);
	})
}

function addUser(userList, user){
	let newList = Object. assign({}, userList)
	newList [user.name] = user
	return newList
}

function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}

function isUser(userList, username){
	return username in userList
}