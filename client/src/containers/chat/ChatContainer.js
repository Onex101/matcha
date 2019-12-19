import React, {Component} from 'react';
import SideBar from './sidebar/SideBar';
import ChatHeading from './ChatHeading';
import Messages from '../messages/Messages';
import MessageInput from '../messages/MessageInput';
import {NOTIFICATION, COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED, TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED, GET_PREVIOUS_MESSAGES} from '../../Events';
import {values} from 'lodash';

export default class ChatContainer extends Component{
	constructor(props){
		super(props)
		
		this.state = {
			chats:[],
			users:[],
			likedUsers: [],
			activeChat:null,
			receiver: null,
			sidebarOpen: true
		}
	}

	componentDidMount(){
		const {socket} = this.props
		this.initSocket(socket)
		// socket.emit(COMMUNITY_CHAT, this.resetChat)
	}
	componentWillUnmount(){
		const {socket} = this.props
		socket.off(PRIVATE_MESSAGE)
		socket.off(USER_CONNECTED)
		socket.off(USER_DISCONNECTED)
	}

	initSocket(socket){	
		// socket.emit(COMMUNITY_CHAT, this.resetChat)
		

		// console.log("Adding Chats to Sidebar")
		// console.log('COMMUNITY_CHAT')
		socket.emit(COMMUNITY_CHAT, this.resetChat)
		socket.on(PRIVATE_MESSAGE, this.addChat)
		socket.on('connect', ()=>{
			socket.emit(COMMUNITY_CHAT, this.resetChat)
		})
		socket.on(USER_CONNECTED, (users)=>{
			// console.log(users)
			this.getLikedPeople(users)
			this.setState({users: values(users)})
		}) 
		socket.on(USER_DISCONNECTED, (users)=>{
			this.setState({users:values(users)})
		})
		// socket.emit(PRIVATE_MESSAGE, {receiver:"Mike", sender: user})
	}

	arrayToObject = (array, keyField) =>
	array.reduce((obj, item) => {
		obj[item[keyField]] = item
		return obj
	}, {})

		
	getLikedPeople = (users) => {
		console.log("Getting liked PEOPLE", users)
		// Get Matches
			var newList = {}
			try {
			fetch('/user/' + localStorage.getItem('id') + '/getliked', {
				method: "GET",
				headers: {
				"Content-Type": "application/json; charset=utf-8",
				},
			})
			.then(response => response.json())
			.then((responseJSON) => {
				// console.log("JSON match test = " + JSON.stringify(responseJSON));
				// console.log('Getting liked people')
				// console.log(responseJSON)
				responseJSON.forEach(element => {
					for (var user in users){
						// console.log(element.id, parseInt(users[user].id))
						if (element.id == parseInt(users[user].id))
							newList[users[user].name] = users[user]
					}
				});
				
				this.setState({ likedUsers: values(newList) });
				// console.log(newList)
				// console.log("APP Matches = " + JSON.stringify(this.state.userMatches));
			})
			.catch(err => console.error(err))
			} catch (e) {
				alert(e.message);
			}
	}

	sendOpenPrivateMessage = (receiver) => {
		const {socket, user} = this.props
		const {activeChat} = this.state
		this.setState({receiver: receiver})
		console.log("sending private message")
		// console.log(receiver, user)
		socket.emit(PRIVATE_MESSAGE, {receiver, sender: user, activeChat})
		socket.emit(NOTIFICATION, receiver.name + " has started a chat with you", receiver)
	}

	resetChat = (chat)=>{
		return this.addChat(chat, true)
	}

	containsObject = function (obj, list) {
		console.log('Checking if object is in list')
		var x = 0;
		while (list[x]){
			console.log(list[x].id, obj.id)
			if (list[x].id == obj.id){
				return (true)
			}
			x++
		}
		return (false)
	}

	addChat = (chat, reset = false) => {
		const {socket} = this.props
		const {chats} = this.state
		// console.log("Adding Chat: " + JSON.stringify(chat))
		// console.log("Current chats: " + JSON.stringify(chats))
		if (!(this.containsObject(chat, chats))){
			const newChats = reset ? [chat]:[...chats, chat]
			this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})
		
			const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
			const typingEvent = `${TYPING}-${chat.id}`

			socket.on(typingEvent, this.updateTypingInChat(chat.id))
			socket.on(messageEvent, this.addMessageToChat(chat.id))
			// console.log("Current chats: " + JSON.stringify(chats))
		}
	}

	addMessageToChat = (chatId)=>{
		return message => {
			// console.log("Message Recieved adding to chat")
			const {chats} = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id == chatId)
					chat.messages.push(message)
				return chat
			})
			this.setState({chats:newChats})
		}
	}

	updateTypingInChat = (chatId)=>{
		return ({isTyping, user})=>{
			// console.log("Updating typing in chat-" + chatId)
			if(user.name != this.props.user.name){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id == chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u != user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
	}

	sendMessage = (chatId, message)=>{
		const {socket} = this.props
		// console.log("sendMessage to socket: " + message)

		socket.emit(MESSAGE_SENT, {chatId, message})
	}

	sendTyping = (chatId, isTyping)=>{
		const {socket} = this.props
		socket.emit(TYPING, {chatId, isTyping})
	}

	setActiveChat = (activeChat)=>{
		this.setState({activeChat})
	}

	onSetSidebar(open) {
		this.setState({ sidebarOpen: open });
	}

	render() {
		const {user} = this.props;

		const {chats, activeChat, users, likedUsers} = this.state;
		// console.log(activeChat)
		return(
			<div className="chat-container">
				<SideBar
					chats={chats}
					user={user}
					users={likedUsers}
					activeChat={activeChat}
					setActiveChat={this.setActiveChat}
					onSendPrivateMessage ={this.sendOpenPrivateMessage}
					open={this.state.sidebarOpen}
					onSetSidebar={this.onSetSidebar.bind(this)}
				/>
				<div className="chat-room-container">
					{activeChat !== null ? (
						<div className="chat-room">
							<ChatHeading 
								name={<>
								<button onClick={() => this.onSetSidebar(!this.state.sidebarOpen)}>></button>{activeChat.name}</>} />
							<Messages
								messages={activeChat.messages}
								user={user}
								typingUser={activeChat.typingUsers}
							/>
							<MessageInput
								sendMessage={(message)=>{this.sendMessage(activeChat.id, message)}}
								sendTyping={(isTyping)=>{this.sendTyping(activeChat.id, isTyping)}}
								receiver={this.state.receiver}
								socket={this.props.socket}
							/>
						</div>
					) :
					<div className="chat-room choose">
						<h3>Choose a chat</h3>
					</div>}
				</div>
			</div>
		)
	}
}