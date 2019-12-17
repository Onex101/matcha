import React, { Component } from "react";
import { Tabs, Tab, ControlLabel} from "react-bootstrap";
import Settings from "./Settings";
import Profile from "./Profile";
import Matches from "./Matches";


export default class ControlledTabs extends Component {
	constructor(props) {
	  super(props);
	  this.handleSelect = this.handleSelect.bind(this);
	  this.state = {
		key: null,
		userInfo: null
	  };
	}
  
	handleSelect(key) {
	  this.setState({ key });
	}
  
	componentDidMount(){
	  console.log("Tabs did mount props:")
	  console.info(this.props)
	  if (!this.state.userInfo){
		if (this.props.userInfo && this.props.userInfo.id){
		  this.setState({userInfo: this.props.userInfo})
		  this.setState({userInfo: this.props.userInfo.data})
		} else if (this.props.userInfo && this.props.userInfo.data && this.props.userInfo.data.id){
		  // console.log("DM Props data userinfo exists")
		  this.setState({userInfo: this.props.userInfo.data})
		} else {
		  // console.log("DM Props is empty")
		}
	  }
	  if (this.state.key === null && this.state.userInfo && this.state.userInfo.id) {
		if (this.state.userInfo.profile_pic_id){
			this.setState({key: 1});
		} else {
			this.setState({key: 3});
		}
	  }
	}

	componentDidUpdate(){
	  console.log("Tabs will update props:")
	  console.info(this.props)
	  if (!this.state.userInfo){
		// console.log("WU State userinfo is empty")
		if (this.props.userInfo && this.props.userInfo.id){
		  // console.log("WU Props userinfo exists")
		  this.setState({userInfo: this.props.userInfo})
		} else if (this.props.userInfo && this.props.userInfo.data && this.props.userInfo.data.id){
		  this.setState({userInfo: this.props.userInfo.data})
		} else {
		  // console.log("WU Props is empty")
		}
	  }
	  if (this.state.key === null && this.state.userInfo && this.state.userInfo.id) {
		if (this.state.userInfo.id === localStorage.getItem("id") && !this.state.userInfo.profile_pic_id){
			this.setState({key: 3});
		} else {
		  this.setState({key: 1});
		}
	  }
	}
 
	checkValidUser() {
		if (this.state.userInfo &&  this.state.userInfo.profile_pic_id) {
			return true;
		} else {
			return false;
		}
	}
 
	render() {
	  const validity = this.checkValidUser();

	  return (
		this.state.userInfo && this.state.userInfo.id ?
		<Tabs
		  activeKey={this.state.key}
		  onSelect={this.handleSelect}
		  id="controlled-tab-example" >
		{validity === true ?
		  <Tab eventKey={1} title="Profile" >
			<Profile 
				userInfo = {this.state.userInfo}
				socket = {this.props.socket}
				getMatches={this.props.getMatches} 
				closeModal={this.props.closeModal}/>
		  </Tab>
		  : <Tab eventKey={1} title="Profile" disabled ></Tab>}
		  {validity === true ? <Tab eventKey={2} title="Matches"><Matches userInfo={this.props.userInfo} userMatches={this.props.userMatches}/></Tab>
			  :<Tab eventKey={2} title="Matches" disabled></Tab>}
		  {this.state.userInfo.id == localStorage.getItem("id") ?
			<Tab eventKey={3} title="Settings">
				<Settings 
				userInfo = {this.props.userInfo}
				setUser = {this.props.setUser} 
				/>
			</Tab> 
		  : null}
		</Tabs>
		: <ControlLabel> Loading ... </ControlLabel>
	  );
	}
  }
  