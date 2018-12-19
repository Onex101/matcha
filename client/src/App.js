import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import SearchBar from "./containers/SearchBar";
import { LinkContainer } from "react-router-bootstrap";
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated       : false,
      userInfo              : null,
      userProfile           : null,
      userMatches           : null,
	  endpoint: "http://localhost:4000"
    };
    this.renderUser = this.renderUser.bind(this);
  }

  send = () => {
	  const socket = socketIOClient(this.state.endpoint)
	  socket.emit(this.state.userInfo) 
  }

  componentWillMount(){
    // Get User
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
          this.setState({ userInfo: responseJSON["data"] });
          console.log("User = " + JSON.stringify(this.state.userInfo));
        })
        .catch(err => console.error(err))
        } catch (e) {
          alert(e.message);
        }
    }
    // Get profile info
    // Get Matches
    this.getMatches();
  }

  getMatches() {
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
        this.setState({ userMatches: responseJSON });
        // console.log("Matches = " + JSON.stringify(this.state.userMatches));
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
    this.setState({ userInfo: user });
    localStorage.setItem('user', user.data.user_name);
    localStorage.setItem('id', user.data.id);
    console.log("ID = " + localStorage.getItem('id'));
    // Get Matches
    this.getMatches();
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.setState({ userInfo: null });
    this.setState({ userMatches: null });
    this.setState({ userProfile: null });
    console.log("ID = " + localStorage.getItem('id'))
  }

  renderUser() {
    const session = localStorage.getItem('user');

    if (session != null){
      console.log("Getting username = " + session);
    }
    return(<Navbar.Collapse><Nav pullRight>
            <Fragment>
              <LinkContainer to="/settings">
              {session
                ? <NavItem>{(session)}</NavItem>
                : <NavItem>Username</NavItem>
              }
              </LinkContainer>
              <LinkContainer to="/login">
              <NavItem onClick={this.handleLogout}>Logout</NavItem>
              </LinkContainer>
            </Fragment>
          </Nav>
          </Navbar.Collapse>
    )
  }

  searchCheck(){
    if (localStorage.getItem('user'))
      return(<SearchBar/>)
  }
  render() {
	const socket = socketIOClient(this.state.endpoint)
	// socket.on('change color', (color) => {
	// 	// setting the color of our button
	// 	document.body.style.backgroundColor = color
	// })
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
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Matcha</Link>
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
        <Routes childProps={childProps} />
      </div>
    );
  }  
}

export default App;
