import React, { Component } from "react";
import { Tabs, Tab, ControlLabel} from "react-bootstrap";
import Settings from "./Settings";
import Profile from "./Profile";
import Likes from "./Likes";

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
      // console.log("Tabs did mount state:")
      // console.info(this.state)
      if (!this.state.userInfo){
        // console.log("DM State userinfo is empty")
        if (this.props.userInfo && this.props.userInfo.id){
          // console.log("DM Props userinfo exists")
          this.setState({userInfo: this.props.userInfo})
          this.setState({userInfo: this.props.userInfo.data})
        }
        else if (this.props.userInfo && this.props.userInfo.data && this.props.userInfo.data.id){
          // console.log("DM Props data userinfo exists")
          this.setState({userInfo: this.props.userInfo.data})
        }
        else {
          // console.log("DM Props is empty")
        }
      }
      if (this.state.key === null && this.state.userInfo && this.state.userInfo.id) {
        // console.log("DU Key State")
        // console.info(this.state)
        if (this.state.userInfo.profile_pic_id){
            this.setState({key: 1});
        }
        else {
            this.setState({key: 3});
        }
      }
    }

    componentWillUpdate(){
      // console.log("In tabs test:")
      // console.info(this.props)
      console.log("Tabs will update props:")
      console.info(this.props)
      // console.log("Tabs will update state:")
      // console.info(this.state)
      if (!this.state.userInfo){
        // console.log("WU State userinfo is empty")
        if (this.props.userInfo && this.props.userInfo.id){
          // console.log("WU Props userinfo exists")
          this.setState({userInfo: this.props.userInfo})
        }
        else if (this.props.userInfo && this.props.userInfo.data && this.props.userInfo.data.id){
          // console.log("WU Props data userinfo exists")
          this.setState({userInfo: this.props.userInfo.data})
        }
        else {
          // console.log("WU Props is empty")
        }
      }
      if (this.state.key === null && this.state.userInfo && this.state.userInfo.id) {
        // console.log("WU Key State")
        // console.info(this.state)
        if (this.state.userInfo.id == localStorage.getItem("id") && !this.state.userInfo.profile_pic_id){
            this.setState({key: 3});
        }
        else {
          this.setState({key: 1});
        }
      }
    }
 
    checkValidUser() {
      // console.log("Valid user check:")
      // console.info(this.state)
        // if (this.state.userInfo && this.state.userInfo.id == localStorage.getItem("id") &&
        //       !this.state.userInfo.profile_pic_id){
        if (this.state.userInfo &&  this.state.userInfo.profile_pic_id) {
          // console.log("Valid user!")
          return true;
        }
        else
            return false;
        // return true
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
            <Profile userInfo = {this.state.userInfo} />
          </Tab>
          : <Tab eventKey={1} title="Profile" disabled ></Tab>}
          
          {/* <Tab eventKey={1} title="Profile">
          {console.log("In tabs test:")}
          {console.info(this.state.userInfo)}
            <Profile userInfo = {this.state.userInfo} />
          </Tab> */}
          {validity === true ? <Tab eventKey={2} title="Likes"><Likes userInfo={this.props.userInfo} userMatches={this.props.userMatches}/></Tab>
              :<Tab eventKey={2} title="Likes" disabled></Tab>}
          {/* <Tab eventKey={2} title="Likes">
            Tab 2 content
          </Tab> */}
          {this.state.userInfo.id == localStorage.getItem("id") ?
            <Tab eventKey={3} title="Settings">
                <Settings 
                // isAuthenticated = {this.props.isAuthenticated}
                            // userHasAuthenticated  = {this.props.userHasAuthenticated}
                            userInfo = {this.props.userInfo}
                            // userProfile = {this.props.userProfile}
                            // userMatches = {this.props.userMatches}
                            setUser = {this.props.setUser} 
                            />
            </Tab> 
          : null}
        </Tabs>
        : <ControlLabel> Loading ... </ControlLabel>
      );
    }
  }
  