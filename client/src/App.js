import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import SearchBar from "./containers/SearchBar";
import { LinkContainer } from "react-router-bootstrap";
import socketIOClient from 'socket.io-client';
import {LOGOUT} from "./Events.js";
import chat from './containers/imgs/chat.png';
import notification from './containers/imgs/notification.png';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated       : false,
      userInfo              : null,
      userProfile           : null,
      userMatches           : null,
      endpoint              : "http://localhost:4000"
    };
    this.renderUser = this.renderUser.bind(this);
  }

  getNotifications(){
    //Make server call to get number of notifications
  }

  showNotifications() {
    // Make server call to show a list of the user's notifications
  }

  componentWillMount(){
    // Get User
    console.log("Local user:", localStorage.getItem('user'))
    console.log("Local id:", localStorage.getItem('id'))
    if (localStorage.getItem('user') && this.state.isAuthenticated === false)
      this.setState({isAuthenticated: true})
    if (localStorage.getItem('user') && this.state.userInfo === null){
      try {
        fetch('/user/' + localStorage.getItem('id'), {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then(response => response.json())
        .then((responseJSON) => {
          console.log("response : ")
          console.info(responseJSON["data"])
          this.setState({ userInfo: responseJSON["data"] });
          // console.log("User = " + JSON.stringify(this.state.userInfo));
        })
        .catch(err => console.error(err))
        } catch (e) {
          alert(e.message);
        }
    }
    // Get profile info
    // Get Matches
    this.getMatches();
    this.getNotifications();
  }

  componentDidUpdate(){
	  // console.log(this.state.userInfo)
  }

  getMatches() {
    // console.log("Getting matches")
    // Get Matches
    try {
      fetch('/user/match/' + localStorage.getItem('id'), {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then(response => response.json())
      .then((responseJSON) => {
        // console.log("JSON match test = ");
        // console.info(responseJSON);
        this.setState({ userMatches: responseJSON });
        // console.log("APP Matches = " + JSON.stringify(this.state.userMatches));
      })
      .catch(err => console.error(err))
      } catch (e) {
        alert(e.message);
      }
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    console.log("SetUser:")
    console.info(user)
    this.setState({ userInfo: user.data });
    console.log("SetUser state:")
    console.info(this.state)
    localStorage.setItem('user', user.data.user_name);
    localStorage.setItem('id', user.data.id);
    console.log("ID = " + localStorage.getItem('id'));
    // Get Matches
    this.getMatches();
    this.getNotifications();
  }

  handleLogout = event => {
    const {socket} = this.state;
    this.userHasAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.setState({ userInfo: null });
    this.setState({ userMatches: null });
    this.setState({ userProfile: null });
    console.log("ID = " + localStorage.getItem('id'))
    socket.emit(LOGOUT);
  }

  renderUser() {
    const session = localStorage.getItem('user');

    if (session != null){
      console.log("Getting username = " + session);
    
    return(<Navbar.Collapse><Nav pullRight>
            <Fragment>
              {this.state.userInfo && this.state.userInfo.profile_pic_id
                ? <NavDropdown eventKey={3} title={<img src={notification} className="nav-icon" id="Notification"/>} id="basic-nav-dropdown">
                    {/* {this.showNotifications()} */}
                  </NavDropdown>
                : <NavDropdown disabled eventKey={3} title={<img src={notification} className="nav-icon" id="Notification"/>} id="basic-nav-dropdown">
                  </NavDropdown>}
              <LinkContainer to="/Chat">
                {this.state.userInfo && this.state.userInfo.profile_pic_id
                    ? <NavItem><img src={chat} className="nav-icon" id="Chat"/></NavItem>
                    : <NavItem disabled><img src={chat} className="nav-icon" id="Chat"/></NavItem>}
              </LinkContainer>
              <NavDropdown eventKey={3} title={(session)} id="basic-nav-dropdown">
                <LinkContainer to="/settings">
                    <NavItem>Profile</NavItem>
                </LinkContainer>  
                <MenuItem eventKey={3.2}>
                  
                </MenuItem>
                <MenuItem divider />
                <LinkContainer to="/login">
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </LinkContainer>
              </NavDropdown>
            </Fragment>
          </Nav>
          </Navbar.Collapse>
    )
    }
  }

  searchCheck(){
    if (localStorage.getItem('user'))
      return(<SearchBar/>)
  }
  render() {
    const childProps = {
      isAuthenticated       : this.state.isAuthenticated,
      userHasAuthenticated  : this.userHasAuthenticated,
      userInfo              : this.state.userInfo,
      userProfile           : this.state.userProfile,
      userMatches           : this.state.userMatches,
      setUser               : this.setUser
    };
    var style = {
      display: 'flex',
    }
    return (
      <div className="App-setup">
      <div className="App-container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="App-logo">Matcha</Link>
            </Navbar.Brand>
            <div style={style}>
            {this.searchCheck()}
            <Navbar.Toggle />
            </div>
          </Navbar.Header>
              {localStorage.getItem('user')
                ? this.renderUser()
                : <Navbar.Collapse><Nav pullRight>
                    <Fragment>
                      <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </Fragment>
                  </Nav></Navbar.Collapse>
              }
        </Navbar>
        {console.log("Childprops: ")}
        {console.log("Test for re-render")}
        {console.info(childProps)}
        <div className="App-content">
          <Routes childProps={childProps} />
        </div>
      </div>
      </div>
    );
  }  
}

export default App;
