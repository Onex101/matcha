import React, {Component} from 'react';

export default class SideBar extends Component{
	constructor(props){
		super(props)

		this.state = {
			user: null
		};
	}

	componentWillUpdate(){
			console.log("PROPS 1: " + JSON.stringify(this.props.user))
			console.log("PROPS 1 User: " + this.state.user)
		if (this.state.user === null && this.props.user !== null){
			console.log("PROPS: " + this.props.user)
			this.setState({user: this.props.user})
			console.log("PROPS User: " + this.state.user)
			// this.setState({user: this.props.userInfo.user_name})
		}
	}

	test(){
		return(this.props.user);
	}

	render() {
		const {chats, activeChat, setActiveChat} = this.props
		// const {user} = this.state.user
		const user = this.test()
		console.log("SIDE Test: " + JSON.stringify(this.props));
		console.log("SIDE User Test: " + JSON.stringify(user));
		return(
			<div id="side-bar">
				<div className="heading">
					<div className="heading">
						<div className="app-name">Chat App</div>
						<div className="menu">
							Menu
						</div>
					</div>
					<div className="search">
						<i className="search-icon"></i>
						<input placeholder="Search" type="text"/>
						<div className="plus"></div>
					</div>
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
						{/* {!user ? user = this.props.user : user = user} */}
						{!user ?
							<span>{user}</span>
							: <span>{this.test()}</span>}
				</div>
			</div>
		)
	}
}