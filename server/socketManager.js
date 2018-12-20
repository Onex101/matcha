const socketIO = require('./index.js');
const {VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT, TYPING} = require('../client/src/Events')
const {createUser, creatMessage, createChat} = require('../client/src/Factories')

let connectedUsers = {}

let communityChat = createChat()

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

	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			socketIO.io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
	})

	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		socketIO.io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);
	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})
}

function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		socketIO.io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

function sendMessageToChat(sender){
	return (chatId, message)=>{
		socketIO.io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
	}
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