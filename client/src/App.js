import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated   : false,
      userInfo              : null
    };
    this.renderUser = this.renderUser.bind(this);
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ userInfo: user });
    // window.localStorage.setItem('user', user.data.user_name);
    localStorage.setItem('user', user.data.user_name);
    console.log("User_data = " + user.data);
    console.log("User_data = " + user.data.user_name);
    console.log("User_data = " + user.data.email);
    const test = localStorage.getItem('user');
    console.log("Test = " + test);
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    localStorage.removeItem('user');
  }

  renderUser() {
    const session = localStorage.getItem('user');
    if (session != null){
      console.log("Getting username = " + session);
    }
    return(<Fragment>
        <LinkContainer to="/signup">
      {session
        ? <NavItem>{(session)}</NavItem>
        : <NavItem>Username</NavItem>
      }
      </LinkContainer>
      <LinkContainer to="/login">
      <NavItem onClick={this.handleLogout}>Logout</NavItem>
      </LinkContainer>
    </Fragment>
    )
  }

  render() {
    const childProps = {
      isAuthenticated       : this.state.isAuthenticated,
      userHasAuthenticated  : this.userHasAuthenticated,
      userInfo              : this.state.userInfo,
      setUser               : this.setUser
    };
    
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Matcha</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {localStorage.getItem('user')
                ? this.renderUser()
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }  
}

export default App;
