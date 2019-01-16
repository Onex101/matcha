const socketIO = require('./index.js');
const {GET_PREVIOUS_MESSAGES, VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING, PRIVATE_MESSAGE} = require('../client/src/Events')
const {createUser, createMessage, createChat} = require('../client/src/Factories')

let connectedUsers = {}

let communityChat = createChat({isCommunity: true})

let communityMessages = [
		{
		id:1,
		time: 100000,
		message: "Hi",
		sender: "Mememem"
	},
	{
		id:2,
		time: 100000,
		message: "This is meme",
		sender: "Mememem"
	},
	{
		id:3,
		time: 100000,
		message: "I like memems",
		sender: "Mememem"
	},
	{
		id:4,
		time: 100000,
		message: "How about you?",
		sender: "Mememem"
	},
	{
		id:5,
		time: 100000,
		message: "Lol",
		sender: "Mememem"
	}
]

module.exports = function(socket){
	// console.log("Socket Id: " + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;

	socket.on(VERIFY_USER, (id, name, callback)=>{
		if (isUser(connectedUsers, name)){
			callback({isUser: true, user:null});
		}
		else{
			console.log("Creating a user " + name)
			callback({isUser: false, user:createUser({id: id, name: name, socketId:socket.id})})
		}
	})

	socket.on(USER_CONNECTED, (user)=>{
		console.log('This user has connected: ')
		console.log(user);
		user.socketId = socket.id;
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
			console.log("Socket user:")
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

	socket.on(PRIVATE_MESSAGE, ({receiver, sender, activeChat})=>{
		console.log(receiver, sender)
		
		if(receiver in connectedUsers){
			const receiverSocket = connectedUsers[receiver].socketId
			if (!activeChat || activeChat.id === communityChat.id){
				const newChat = createChat({name:`${receiver}&${sender}`, users:[receiver, sender]})
				console.log(receiver)
				console.log(connectedUsers[receiver].socketId)
				socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat)
				socket.emit(PRIVATE_MESSAGE, newChat)
				
			}
			else{
				socket.to(receiverSocket).emit(PRIVATE_MESSAGE, activeChat)
			}
		}
	})

	socket.on(GET_PREVIOUS_MESSAGES, ({chat})=>{
		if(chat.id === communityChat.id){
			console.log("sending old messages")
			communityMessages.forEach(function (test, index){
					socketIO.io.to(socket.id).emit(`${MESSAGE_RECEIVED}-${chat.id}`, test)
				}
			)
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
		newList[user.name] = user
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