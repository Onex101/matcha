import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addUserPost() {
    const user = this.props.fieldValues;
    // fetch(`/products/add?name=${product.name}&price=${product.price}`)
    // .then(response => response.json())
    fetch(`/user/create`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        user_name:  user.user_name,
        email:      user.email,
        password:   user.password,
        birth_date:  user.birth_date,
        gender:     this.state.gender || '0.5',
        pref:       this.state.pref || '0.5',
        gps_lat:    this.state.gps_lat,
    gps_lon:    this.state.gps_lon
      })
    })
    // .then(this.getUsers)
    .catch(err => console.error(err))
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    try {
      // await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
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
