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
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ userInfo: user });
    console.log(user.data);
    console.log(user.data.user_name);
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }

  render() {
    const childProps = {
      isAuthenticated       : this.state.isAuthenticated,
      userHasAuthenticated  : this.userHasAuthenticated,
      userInfo                  : this.state.userInfo,
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
              {this.state.isAuthenticated
                // ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                ? <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>{this.state.user.data.user_name}</NavItem>
                      <NavItem>Username</NavItem>
                    </LinkContainer>
                    {/* <LinkContainer to="/login"> */}
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    {/* </LinkContainer> */}
                  </Fragment>
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
