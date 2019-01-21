import React, { Component } from "react";
import { Tabs, Tab, ControlLabel} from "react-bootstrap";
import Settings from "./Settings";
import Profile from "./Profile";

export default class ControlledTabs extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        key: null
      };
    }
  
    handleSelect(key) {
      this.setState({ key });
    }

    checkValidUser() {
        // if (this.props.userInfo && this.props.userInfo.profile)
        //     return true;
        // else
        //     return false;
        return true
    }

    componentDidMount(){
        if (this.props.userInfo && this.props.userInfo.profile){
            this.setState({key: 1});
        }
        else {
            this.setState({key: 3});
        }
    }
    
  
    render() {
        const validity = this.checkValidUser();
        var childProps = this.props;
        return (this.props.userInfo && this.state.key && childProps ?
            <Tabs activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="controlled-tab-example" >

            {validity === true ?
                        <Tab eventKey={1} title="Profile" >
                            <Profile isAuthenticated = {this.props.isAuthenticated}
                                userHasAuthenticated  = {this.props.userHasAuthenticated}
                                userInfo = {this.props.userInfo}
                                userProfile = {this.props.userProfile}
                                userMatches = {this.props.userMatches}
                                setUser = {this.props.setUser} />
                        </Tab>
                        : <Tab eventKey={1} title="Profile" disabled ></Tab>}
            {validity === true ? <Tab eventKey={2} title="Likes"></Tab>
            :<Tab eventKey={2} title="Likes" disabled></Tab>}
            {this.props.userInfo.id == localStorage.getItem('id') ? 
                <Tab eventKey={3} title="Settings">
                    <Settings isAuthenticated = {this.props.isAuthenticated}
                        userHasAuthenticated  = {this.props.userHasAuthenticated}
                        userInfo = {this.props.userInfo}
                        userProfile = {this.props.userProfile}
                        userMatches = {this.props.userMatches}
                        setUser = {this.props.setUser} />
                </Tab>:null}
            </Tabs>
        :<ControlLabel> Loading ... </ControlLabel>);
        }
}
