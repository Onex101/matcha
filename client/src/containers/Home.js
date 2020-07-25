import React, { Component } from "react";
import "./Home.css";
import {ControlLabel } from "react-bootstrap";
import UserList from "../components/UserList";

// Renders the homepage given that the user is not currently signed in
export default class Home extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  matches: props.userMatches,
	  order:    false
	}
  }

  componentDidUpdate(){
	if (this.state.matches === null){
	  this.getMatches();
	}
	else if (this.state.order === false && this.state.matches !== null && this.props.userMatches !== null && this.state.matches !== this.props.userMatches) {
	  this.setState({matches: this.props.userMatches});
	}
	else if (this.state.order !== false && this.state.matches !== null && this.props.userMatches !== null) {
	  console.log("State matches length = ")
	  console.info(this.state.matches.length)
	  console.info(Object.keys(this.state.matches).length)
	  console.log("Props matches length = ")
	  console.info( Object.keys(this.props.userMatches).length)
	  if (this.state.matches.length && this.state.matches.length !== Object.keys(this.props.userMatches).length) {
		// if ( this.state.order === false) {
		console.log("Updating Matches")
		console.log("Order: " + this.state.order)
		this.setState({matches: this.props.userMatches},
		console.log("State set:"),
		console.info(this.state.matches),this.sortNewList()
		  );
		// }
	  }
	}
  }
  
  landerCheck() {
	if (localStorage.getItem('user')) {
	  if (this.props.userInfo && this.props.userInfo.id && this.state.matches !== null) {
		if (this.props.userInfo && this.props.userInfo.profile_pic_id) {
		  return (<div><UserList 
			matches={this.state.matches} 
			socket={this.props.socket}
			getMatches = {this.props.getMatches}
			userInfo={thhis.props.userInfo}/></div>)
		} else {
		  return (<div><h1>Hey stranger!</h1><p>Head over to your profile to add a profile picture so other users can see you!</p></div>)
		}
	  } else {
		  return <div className="Home"><ControlLabel> Loading ... </ControlLabel></div>;
	  }
	}
  }

  getMatches() {
	if (this.props.userMatches !== null) {
	  this.setState({matches: this.props.userMatches});
	}
  }

  render() {
	return(<div className="Home">
			  <div className="lander">
				{localStorage.getItem('user')
				  ?  this.landerCheck()
				  : <div><h1>Matcha</h1><p>Find your Match and let Sparks fly!</p></div>}
				  </div>
			   </div>)
  }
}
