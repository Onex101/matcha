import React, { Component } from "react";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Chat.css";
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chat/ChatContainer'

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

	componentWillMount(){
	// this.initSocket()
			// console.log("SOCK Test 1: " + this.state.socket);
		
		if (this.state.user === null && this.props.userInfo !== null){
			this.setState({user: this.props.userInfo.user_name}, this.initSocket())
		}
		// if (this.state.socket === null && this.props.userInfo)
		if (this.state.socket === null && localStorage.getItem('user') )
			this.initSocket();
	}

	componentDidUpdate(){
		
		if (this.state.user === null && localStorage.getItem('user') !== null){
			this.setState({user: localStorage.getItem('user')});
			// this.initSocket();
		}
		console.log("SOCK Test 2: " + this.state.socket);
		if (this.state.socket === null && this.props.userInfo)
			this.initSocket();
	}

	initSocket = ()=>{
		console.log("Test A");
		const socket = io(socektUrl)
		console.log("Test B");
		socket.on('connect', ()=>{
			console.log("Connected");
		})
		console.log("Test C");
		this.setState({socket: socket})
		console.log("Test D");
		console.log("SOCK User: " + JSON.stringify(this.props));
		console.info(this.props);
		console.log("User test 1 LOCAL: " + localStorage.getItem('user'));
		// if (this.props.userInfo) {
			console.log("Test E");
			let user = {};
			user.name = localStorage.getItem('user');
			console.log(user);
			socket.emit(USER_CONNECTED, user);
		// }
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
		const {title} = this.props
		const {socket, user} = this.state
		if (this.state.user === null && this.props.userInfo)
			return (<ChatContainer socket={socket} user={this.props.userInfo.user_name} logout={this.logout}/>)
		else
			return (<ChatContainer socket={socket} user={user} logout={this.logout}/>)
	}

	render() {
		const {title} = this.props
		const {socket, user} = this.state
		console.log("User TEST A= " + this.state.user)

		return (
		<div className="chat">
			<div className="chat-container">
			{this.loadContainer()}
			</div>
		</div>
		);
	}
}
