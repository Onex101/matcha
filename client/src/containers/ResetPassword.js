import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import queryString from 'query-string'

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      user_name: '',
      password: '',
      confirmPassword: '',
      updated: false,
      isLoading: true,
      error: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    // const { user_name, vericode } = this.state

    console.log(this.props.location.search) // "?filter=top&origin=im"
    console.log(this.props.location.search.user) // "?filter=top&origin=im"

    var inputString = JSON.stringify(this.props.location.search);
    console.log("TESTER")

    const values = queryString.parse(this.props.location.search)

    console.log(values.user) // "top"
    console.log(values.origin) // "im"
    this.setState({user_name: values.user, veri_code: values.origin});

    try {
      fetch(`/password_reset/` + values.user + '/' + values.origin, {
          method: "GET",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
      })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON["error"]) {
          this.setState({ error: true, errorMessage: responseJSON["error"] })
        } else {
          this.setState({ isLoading: false})
        }
        console.log(responseJSON);
      })
      .catch(err => console.error(err))
  } catch (e) {
      alert("Settings 4: " + e.message);
  }

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
    console.log("PASSWORD: " + this.state.password)
    // changeg password on submit
    fetch(`/user/update/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        user_name: this.state.user_name,
        veri_code: this.state.veri_code,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          this.setState({ error: true })
        }
        else {
          this.setState({ updated: true })
        }
        console.log(responseJSON);
      })
      .catch(err => console.error(err))
  };

  render() {
    const { password, error, isLoading, updated, errorMessage } = this.state;

    if (error) {
      return (
        <div>
          <div>
            <h4>Problem resetting password. Please send another reset link.</h4>
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <form className="password-form" onSubmit={this.updatePassword}>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>New Password</ControlLabel>
              <FormControl
                autoFocus
                type="password"
                onChange={this.handleChange('password')}
                value={password}
              /></FormGroup>
            <Button
              block
              bsSize="large"
              // disabled={!this.validateForm()}
              type="submit">
              Reset Password</Button>
          </form>

          {updated && (
            <div>
              <p>
                Your password has been successfully reset, please try logging in
                again.
              </p>
            </div>
          )}
        </div>
      );
    }
  }
}