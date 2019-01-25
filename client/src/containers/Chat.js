import React, { Component } from "react";
import "./Chat.css";
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT, VERIFY_USER} from '../Events';
import ChatContainer from './chat/ChatContainer';
import {createUser} from '../Factories';
import {ControlLabel } from "react-bootstrap";

const socketUrl = "http://localhost:4000"

export default class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error:"",
			socket:		 null,
			user:		 null,
		};
	}

	componentDidMount(){
		if(!this.state.socket){
			console.log("Test 1")
			this.initSocket();
		}
	}

	componentWillMount(){
		if(!this.state.socket){
			console.log("Test 2")
			this.initSocket();
		}
	}

	componentWillUnmount(){
		this.logout()
	}

	componentWillUpdate(){
		if(!this.state.socket){
			console.log("Test 3")
			this.initSocket();
		}
	}

	initSocket = ()=>{
		console.log('connecting user')
		const socket = io(socketUrl)
		var name, id
		name = localStorage.getItem('user');
		id = localStorage.getItem('id');
		
		socket.on('connect', ()=>{
			console.log("Connected " + name);
		})
		
		this.setState({socket: socket})
		socket.emit(VERIFY_USER, id, name, this.verifyUser)
	}

	verifyUser = ({user, isUser}) => {
		const {socket} = this.state
		console.log("This is the user:")
		console.log(user)
		// socket.emit(USER_CONNECTED, user)
		this.setState({user})
		console.log('user_connected')
		socket.emit(USER_CONNECTED, user);
	}

	setUser = (user) =>{
		const { socket } = this.state
		
	}

	logout = ()=>{
		const {socket}=this.state
		socket.emit(LOGOUT)
		this.setState({user:null})
	}

	render(){
		// console.log("PROPS and or localStorage")
		// console.info(this.props)
		// console.info(localStorage)
		const {socket, user} = this.state
		console.log("Does user exist: ")
		console.log(this.state)
		return(this.state.user ? 
				<div className="chat">
					<div className="chat-container">
						{(<ChatContainer socket={socket} user={user}/>)}
					</div>
				</div>
				:
				<ControlLabel> Loading ... </ControlLabel>
			)
	}
}
