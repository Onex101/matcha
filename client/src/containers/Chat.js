import React, { Component } from "react";
import "./Chat.css";
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../Events';
import ChatContainer from './chat/ChatContainer'
import {ControlLabel } from "react-bootstrap";

const socektUrl = "http://localhost:4000"

export default class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chatId: "",
			chat: null,
			socket: null,
			user: null,
		};
	}

	componentDidMount(){
		if (this.state.user === null && this.props.userInfo !== null)
			this.setState({user: this.props.userInfo.user_name}, this.initSocket())
		if (this.state.socket === null && localStorage.getItem('user') )
			this.initSocket();
	}

	componentWillMount(){
		if (this.state.user === null && this.props.userInfo !== null)
			this.setState({user: this.props.userInfo.user_name}, this.initSocket())
		if (this.state.socket === null && localStorage.getItem('user') )
			this.initSocket();
	}

	initSocket = ()=>{
		const socket = io(socektUrl)
		socket.on('connect', ()=>{
			console.log("Connected");
		})
		this.setState({socket: socket})
		console.info(this.props);
		let user = {};
		user.name = localStorage.getItem('user');
		console.log("SOCK USR 1: " + user.name)
		console.log(user);
		socket.emit(USER_CONNECTED, user);
		console.log("SOCK USR 2: " + socket)
		console.info(socket)
	}

	logout = ()=>{
		const {socket}=this.state
		socket.emit(LOGOUT)
		this.setState({user:null})
	}

	getChats() {
		if (this.props.userMatches)
		{
			var ret = '<div className="lander">';
			for (var elem in this.props.userMatches) {
				console.log("elem = " + JSON.stringify(this.props.userMatches[elem].data.user_name));
				ret += '<ButtonGroup><Button bsSize="large" onClick={this.openChat('+ this.props.userMatches[elem].data.id + ')}>' + this.props.userMatches[elem].data.user_name + '</Button></ButtonGroup><br />'
			};
			ret += '</div>';
			console.log("RET = " + ret);
			return ret;
		}
	}

	loadContainer(){
		// const {title} = this.props
		const {socket, user} = this.state

		if (this.state.user === null && this.props.userInfo)
			return (<ChatContainer socket={socket} user={this.props.userInfo.user_name} logout={this.logout}/>)
		else
			return (<ChatContainer socket={socket} user={user} logout={this.logout}/>)
	}

	render(){
		console.log("PROPS:")
		console.info(this.props)

		return(this.props.userInfo ? <div className="chat">
				<div className="chat-container">
				{this.loadContainer()}
			</div>
			</div>
			: <ControlLabel> Loading ... </ControlLabel>)
	}
}
