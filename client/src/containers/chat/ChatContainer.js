import React, {Component} from 'react';
import SideBar from './sidebar/SideBar';
import ChatHeading from './ChatHeading';
import Messages from '../messages/Messages';
import MessageInput from '../messages/MessageInput';
import {COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED, TYPING, PRIVATE_MESSAGE, USER_CONNECTED, USER_DISCONNECTED, GET_PREVIOUS_MESSAGES} from '../../Events';
import {values} from 'lodash';

export default class ChatContainer extends Component{
	constructor(props){
		super(props)
		
		this.state = {
			chats:[],
			users:[],
			activeChat:null
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
		console.log("Adding Chats to Sidebar" + JSON.stringify(this.props.user))
		console.log('COMMUNITY_CHAT')
		socket.emit(COMMUNITY_CHAT, this.resetChat)
		socket.on(PRIVATE_MESSAGE, this.addChat)
		socket.on('connect', ()=>{
			socket.emit(COMMUNITY_CHAT, this.resetChat)
		})
		socket.on(USER_CONNECTED, (users)=>{
			this.setState({users: values(users)})
		})
		socket.on(USER_DISCONNECTED, (users)=>{
			this.setState({users:values(users)})
		})
		// socket.emit(PRIVATE_MESSAGE, {receiver:"Mike", sender: user})
	}

	sendOpenPrivateMessage = (receiver) => {
		const {socket, user} = this.props
		const {activeChat} = this.state
		console.log("sending private message")
		console.log(receiver, user)
		socket.emit(PRIVATE_MESSAGE, {receiver, sender: user, activeChat})
	}

	resetChat = (chat)=>{
		return this.addChat(chat, true)
	}

	addChat = (chat, reset = false) => {
		console.log("Adding Chat: " + chat.id)
		const {socket} = this.props
		const {chats} = this.state

		const newChats = reset ? [chat]:[...chats, chat]
		this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})
	
		const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, this.updateTypingInChat(chat.id))
		socket.on(messageEvent, this.addMessageToChat(chat.id))
	}

	addMessageToChat = (chatId)=>{
		return message => {
			console.log("Message Recieved adding to chat")
			const {chats} = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})
			this.setState({chats:newChats})
		}
	}

	updateTypingInChat = (chatId)=>{
		return ({isTyping, user})=>{
			// console.log("Updating typing in chat-" + chatId)
			if(user.name !== this.props.user.name){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
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
		console.log("sendMessage to socket: " + message)

		socket.emit(MESSAGE_SENT, {chatId, message})
	}

	sendTyping = (chatId, isTyping)=>{
		const {socket} = this.props
		socket.emit(TYPING, {chatId, isTyping})
	}

	setActiveChat = (activeChat)=>{
		this.setState({activeChat})
	}

	render() {
		const {user} = this.props;

		const {chats, activeChat, users} = this.state;
		return(
			<div className="chat-container">
				<SideBar
					chats={chats}
					user={user}
					users={users}
					activeChat={activeChat}
					setActiveChat={this.setActiveChat}
					onSendPrivateMessage ={this.sendOpenPrivateMessage}
				/>
				<div className="chat-room-container">
					{activeChat !== null ? (
						<div className="chat-room">
							<ChatHeading name={activeChat.name} />
							<Messages
								messages={activeChat.messages}
								user={user}
								typingUser={activeChat.typingUsers}
							/>
							<MessageInput
								sendMessage={(message)=>{this.sendMessage(activeChat.id, message)}}
								sendTyping={(isTyping)=>{this.sendTyping(activeChat.id, isTyping)}}
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