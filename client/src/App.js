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
    window.localStorage.setItem('user', user.data.user_name);
    // window.localStorage.setItem('user', "Test");
    console.log("User_data = " + user.data);
    console.log("User_data = " + user.data.user_name);
    console.log("User_data = " + user.data.email);
    const test = window.localStorage.getItem('user');
    console.log("Test = " + test);
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
    const user = this.state.userInfo;
    
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
                      {/* <NavItem>{render(window.localStorage.getItem('user'))}</NavItem> */}
                      {/* <NavItem>{function MyComponent ({ name }) {
                        return <div className='message-box'>
                          Hello {window.localStorage.getItem('user')}
                        </div>
                      }}</NavItem> */}
                      <NavItem>Username</NavItem>
                      
                      <NavItem>{console.log(user)}</NavItem>
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
