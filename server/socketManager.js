var socketIO = require('./index.js');
const request = require('supertest');
const {GET_PREVIOUS_MESSAGES, VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING, PRIVATE_MESSAGE} = require('../client/src/Events')
const {createUser, createMessage, createChat} = require('../client/src/Factories')

let connectedUsers = {}

let communityChat = createChat({id: 1, isCommunity: true})

module.exports = function(socket){
	// console.log("Socket Id: " + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;

	let getUsersChat;

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
		sendMessageToChatFromUser = sendMessageToChat(user)
		sendTypingFromUser = sendTypingToChat(user.name)
		getUsersChat = getChat(user)
		// console.log(getUsersChat)
		// getUsersChat('Community', ()=>{})

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
		// console.log(this.getUsersChat)
		// getUsersChat('Community')
		// getUsersChat()
		var msgArray = [];
		var user_test = getChat({id: 1})
		user_test({id: 1}, (results)=>{
			// console.log(messages)
			messages = results.body
			messages.forEach(element => {
				// console.log(element)
				var date = new Date(element.timestamp);
				// console.log(date)
				var hours = date.getHours();
				var minutes = "0" + date.getMinutes();
				var formattedTime = hours + ':' + minutes.substr(-2);
				newMsg = {id: element.id, sender: element.sender, message: element.msg, time: formattedTime}
				msgArray.push(newMsg)
			});
			callback(createChat({id: 1, messages: msgArray, isCommunity: true}))
		})
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		// console.log("MESSAGE SENT " + message + " " + " " + chatId)
		console.log(chatId)
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

	socket.on(PRIVATE_MESSAGE, ({receiver, sender, activeChat})=>{
		console.log(receiver, sender)
		var msgArray = [];
		if(receiver.name in connectedUsers){
			const receiverSocket = connectedUsers[receiver.name].socketId
			if (!activeChat || activeChat.id === communityChat.id){
				console.log('Changing chat')
				getUsersChat(receiver, (result)=>{
					// console.log('Result from getting chat')
					// console.log(result.body)
					if (result.body.insertId){
						conversation_id = result.body.insertId
						messages = []
					}
					else if (result.body.index >= 0){
						conversation_id = result.body.index
						messages = []
					}
					else if (result.body[0].conversation_id){
						conversation_id = result.body[0].conversation_id
						messages = result.body
					}
					else{
						conversation_id = result.body[0].id
						messages = []
					}
					console.log(conversation_id)
					if (messages){
						messages.forEach(element => {
							// console.log(element)
							var date = new Date(element.timestamp);
							// console.log(date)
							var hours = date.getHours();
							var minutes = "0" + date.getMinutes();
							var formattedTime = hours + ':' + minutes.substr(-2);
							newMsg = {id: element.id, sender: element.sender, message: element.msg, time: formattedTime}
							msgArray.push(newMsg)
						});
					}
					const newChat = createChat({id: conversation_id, messages:msgArray, name:`${receiver.name}&${sender.name}`, users:[receiver.name, sender.name]})
					socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat)
					socket.emit(PRIVATE_MESSAGE, newChat)
				})
			}
			else{
				socket.to(receiverSocket).emit(PRIVATE_MESSAGE, activeChat)
			}
		}
	})

	socket.on(GET_PREVIOUS_MESSAGES, ({chat})=>{
		// if(chat.id === communityChat.id){
		// 	console.log("sending old messages")
		// 	communityMessages.forEach(function (test, index){
		// 			socketIO.io.to(socket.id).emit(`${MESSAGE_RECEIVED}-${chat.id}`, test)
		// 		}
		// 	)
		// }
	})
}

function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		socketIO.io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

function sendMessageToChat(sender){
	return (chatId, message)=>{
		console.log("sendMessageToChat: " + message + " " + chatId)
		// console.log(chatId)
		request(socketIO.app)
		.post(`/msg/send`)
		.send({conversation_id: chatId, message: message, sender:sender.id})
		.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;
				else console.log(res.text);
			});
		socketIO.io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender: sender.name}))
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

function getChat(sender){
	// console.log(socketIO)
	return (receiver, callback)=>{
		console.log("Sender and receiver:")
		console.log(sender, receiver)
		request(socketIO.app)
		.get(`/msg/` + sender.id + `/` + receiver.id)
		.set('Accept', 'application/json')
			// .expect('Content-Type', /json/)
			.expect(200)
		.end(function(err, res) {
			if (err) throw err;
			else callback(res);
		});
	}
}
