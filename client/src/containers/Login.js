import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: ""
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

  // loginPost() {
  //   const user = this.state;
  //   // fetch(`/products/add?name=${product.name}&price=${product.price}`)
  //   // .then(response => response.json())
  //   fetch(`/login`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify({
  //       user_name:  user.user_name,
  //       password:   user.password,
  //     })
  //   })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => console.error(err))
  // }

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
          user_name:  user.user_name,
          password:   user.password,
        })
      })
      .then(response => response.json())
      .then((responseJSON) => {
          console.log(responseJSON);
          // console.log(responseJSON);
          if (responseJSON["success"]) {
            if (responseJSON["success"] === "login sucessfull") {
              this.props.userHasAuthenticated(true);
              this.props.setUser(responseJSON["user"]);
              alert("Logged in");
            } else if (responseJSON["success"] === "Username and password does not match"){
              alert(responseJSON["success"]);
            } else if (responseJSON["success"] === "Username does not exist"){
              alert(responseJSON["success"]);}
          }
          else
          alert("Something went wrong :(");
      })
      .catch(err => console.error(err))
      } catch (e) {
        alert(e.message);
      }
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
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
