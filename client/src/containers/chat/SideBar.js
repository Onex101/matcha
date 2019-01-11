import React, {Component} from 'react';

export default class SideBar extends Component{
	constructor(props){
		super(props)

		this.state = {
			receiver:""
		};
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const {receiver} = this.state
		const {onSendPrivateMessage} = this.props
		console.log(receiver)

		onSendPrivateMessage(receiver)
	}

	render() {
		const {chats, activeChat, user, setActiveChat} = this.props
		const {receiver} = this.state
		return(
			<div id="side-bar">
				<div className="heading">
					<div className="heading">
						<div className="app-name">Chat App</div>
						<div className="menu">
							Menu
						</div>
					</div>
					<form onSubmit={this.hanleSubmit} className="search">
						<i className="search-icon"></i>
						<input placeholder="Search"
								type="text"
								value={receiver}
								onChange={(e)=>{this.setState({receiver: e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div
						className="users"
						ref="users"
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null)}}>
						{
							chats.map((chat)=>{
								if(chat.name){
									const lastMessage = chat.messages[chat.messages.length - 1];
									const user = chat.users.find(({name})=>{
										return name !== this.props.name
									}) || {name:"Community"}
									const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
									
									return(
										<div
											key={chat.id}
											className={`user ${classNames}`}
											onClick={ ()=>{ setActiveChat(chat)}}
											>
											<div className="user-photo">{user.name[0].toUpperCase()}</div>
											<div className="user-info">
												<div className="name">{user.name}</div>
												{lastMessage && <div className="last-message">{lastMessage.message}</div>}
											</div>
										</div>
									)
								}
								return null
							})
						}
					</div>
				</div>
				<div className="current-user">
						<span>{user}</span>
				</div>
			</div>
		)
	}
}