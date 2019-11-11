import React, {Component} from 'react';
import {SideBarOption} from './SideBarOption';
import {get, last, differenceBy} from 'lodash';
import {createChatNameFromUsers} from '../../../Factories'

export default class SideBar extends Component{
	static type = {
		CHATS:"chats",
		USERS:"users"
	}
	constructor(props){
		super(props)

		this.state = {
			receiver:"",
			activeSideBar: SideBar.type.CHATS
		};
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const {receiver} = this.state
		const {onSendPrivateMessage} = this.props
		// console.log(receiver)
		onSendPrivateMessage(receiver)
		this.setState({receiver:""})
	}

	addChatForUser = (user)=>{
		this.setActiveSideBar(SideBar.type.CHATS)
		this.props.onSendPrivateMessage(user)
	}

	setActiveSideBar = (newSideBar) =>{
		this.setState({activeSideBar:newSideBar})
	}

	render() {
		const {chats, activeChat, user, setActiveChat, users} = this.props
		const {receiver, activeSideBar} = this.state
		console.log(users, user, chats)
		return(
			<div id="side-bar">
				<div className="heading">
					<div className="heading">
						<div className="app-name">Chat App</div>
						<div className="menu">
							Menu
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"></i>
						<input placeholder="Search"
								type="text"
								value={receiver}
								onChange={(e)=>{this.setState({receiver: e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div className="side-bar-select">
						<div
							onClick = {()=>{this.setActiveSideBar(SideBar.type.CHATS)}}
							className={`side-bar-select__option ${(activeSideBar === SideBar.type.CHATS) ? 'active' : ''}`}>
							<span>
								Chats
							</span>
						</div>
						<div
							onClick = {()=>{this.setActiveSideBar(SideBar.type.USERS)}}
							className={`side-bar-select__option ${(activeSideBar === SideBar.type.USERS) ? 'active' : ''}`}>
							<span>
								Users
							</span>
						</div>
					</div>
					<div
						className="users"
						ref="users"
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null)}}>
						{
							activeSideBar === SideBar.type.CHATS ?
							chats.map((chat)=>{
								// console.log(user)
								if(chat.name){
									// console.log(chat)
									const lastMessage = chat.messages[chat.messages.length - 1];
									const chatSideName = chat.users.find((name)=>{
										console.log("Name and user_name")
										console.log(name, user)
										return name !== user
									}) || "Community"
									const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
									
									return(
										<SideBarOption
											key = {chat.id}
											name = {chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
											lastMessage = {get(last(chat.messages), 'message', '')}
											active = {activeChat.id === chat.id}
											onClick = {() => {this.props.setActiveChat(chat)}}
										/>
									)
								}
								return null
							})
						
						:
							differenceBy(users, [user], 'name').map((otherUser)=>{
								// console.log(users)
								return(
									<SideBarOption
										key = {otherUser.id}
										name = {otherUser.name}
										onClick = { () => {this.addChatForUser(otherUser)}}
									/>
								)
							})
						}
					</div>
				</div>
				<div className="current-user">

						<span>{user.name}</span>
				</div>
			</div>
		)
	}
}