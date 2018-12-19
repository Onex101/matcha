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
	  user: null
	};
  }

  componentWillMount(){
	  this.initSocket()
  }

  initSocket = ()=>{
	const socket = io(socektUrl)
	socket.on('connect', ()=>{
		console.log("Connected");
	})
	this.setState({socket})
  }

  setUser = (user)=>{
	  const {socket} = this.state;
	  socket.emit(USER_CONNECTED, user);
	  this.setState({user})
  }

  logout = ()=>{
	  const {socket}=this.state
	  socket.emit(LOGOUT)
	  this.setState({user:null})
  }

  getChats() {
      if (this.props.userMatches)
      {
        // console.log("State = " + this.state.matches);
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

  openChat(id) {
      this.setState({chatId: id});
      //get chat with ID
  }

  chatRoom() {
      if (this.state.chat === null) {
          return <HelpBlock>Select a chat to open</HelpBlock>
      }
      else {
        //write what's in the chat
      }
  }
  render() {
	// console.log(this.props.userMatches);
	const {title} = this.props
	const {socket, user} = this.state
    return (
	<div className="chat">
		<div className="container">
			{
				!user ?
				<LoginForm socket={socket} setUser={this.setUser}/>
				:
				<ChatContainer socket={socket} user={user} logout={this.logout}/>
			}
		</div>
	</div>
    );
  }
}
