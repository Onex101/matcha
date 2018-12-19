import React, { Component } from "react";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: "",
      chat: null
    };
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
      console.log(this.props.userMatches);
    return (
      <div className="chat">
        {/* <div> */}
            <div dangerouslySetInnerHTML={{__html: this.getChats()}}></div>
            <div className="chatroom">{this.chatRoom()}</div>
        {/* </div> */}
      </div>
    );
  }
}
