import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: "",
      error: "",
    };
  }

  validateForm() {
    return this.state.user_name.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {

      const user = this.state;
      fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          user_name: user.user_name,
          password: user.password,
        })
      })
        .then(response => response.json())
        .then((responseJSON) => {
          // console.log(responseJSON);
          if (responseJSON["success"]) {
            if (responseJSON["success"] === "login sucessfull") {
              this.setState({error:"Something went wrong"});

              this.props.userHasAuthenticated(true);
              this.props.setUser(responseJSON["user"]);
              this.props.history.push("/");
              window.location.reload();

            } else if (responseJSON["success"] === "Username and password does not match") {
              this.setState({error: responseJSON["success"]});
              alert(responseJSON["success"]);
            } else if (responseJSON["success"] === "Username does not exist") {
              this.setState({error: responseJSON["success"]});
              alert(responseJSON["success"]);
            }
          }
          else
            this.setState({error:"Something went wrong"});
            alert("Something went wrong :(");
        })
        .catch(err => {            
        this.setState({error:"Something went wrong"});
        console.error(err)})
    } catch (e) {
      this.setState({error:"Something went wrong"});
      alert(e.message);
    }
  }

  forgotPassword = async event => {
    event.preventDefault();
    this.props.history.push("/forgot");
  }


  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="user_name" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.user_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            Login
          </Button>
          <br /><a onClick={this.forgotPassword} id="forgot">Forgot Password?</a>
          <br />
          {this.state.error ? <p data-testid='error' id="error">{this.state.error }</p> : <div/>}
        </form>
      </div>
    );
  }
}
