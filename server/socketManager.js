const socketIO = require('./index.js');
const {VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING, PRIVATE_MESSAGE} = require('../client/src/Events')
const {createUser, createMessage, createChat} = require('../client/src/Factories')

let connectedUsers = {}

let communityChat = createChat()

module.exports = function(socket){
	// console.log("Socket Id: " + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;

	socket.on(VERIFY_USER, (nickname, callback)=>{
		if (isUser(connectedUsers, nickname)){
			callback({isUser: true, user:null});
		}
		else{
			console.log("creating a user")
			callback({isUser: false, user:createUser({name: nickname, socketID:socket.id})})
		}
	})

	socket.on(USER_CONNECTED, (user_name)=>{
		// console.log('This user has connected: ' + JSON.stringify(user))
		user = createUser({name: user_name, socketID:socket.id})
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user
		// console.log("Connected Users: " + JSON.stringify(connectedUsers));
		sendMessageToChatFromUser = sendMessageToChat(user.name);
		sendTypingFromUser = sendTypingToChat(user.name)

		socketIO.io.emit(USER_CONNECTED, connectedUsers)
		// console.log(socket.user);
		console.log("Connected Users: " + JSON.stringify(connectedUsers));
	})

	socket.on('disconnect', ()=>{
		if("user" in socket){
			console.log(socket.user)
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
		// console.log("MESSAGE SENT " + message + " " + " " + chatId)
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

	socket.on(PRIVATE_MESSAGE, ({receiver, sender})=>{
		console.log(receiver, sender)
		if(receiver in connectedUsers){
			const newChat = createChat({name:`${receiver}&${sender}`, users:[receiver, sender]})
			const receiverSocket = connectedUsers[receiver].socketID
			console.log(receiverSocket)
			socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat)
			socket.emit(PRIVATE_MESSAGE, newChat)
		}
	})
}

function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		socketIO.io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

function sendMessageToChat(sender){
	return (chatId, message)=>{
		// console.log("sendMessageToChat: " + message + " " + chatId)
		socketIO.io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}))
	}
}

function addUser(userList, user){
	// console.log("Add user: ", user)
	let newList = Object. assign({}, userList)
	if (user)
		newList[user.name] = user.name
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