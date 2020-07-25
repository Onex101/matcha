import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ForgotPasswordEmail.css";


export default class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      emailSent: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validateForm() {
    return this.state.email.length > 0;
  }

  sendEmail = e => {
    e.preventDefault();
    if (this.validateEmail(this.state.email)) {
      //   Verify and Send password reset email

      // 1 checck if email is in the database
      // 2 if so, send verification email
      fetch(`/user/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          email: this.state.email
        })
      })
        .then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.error) {
            this.setState({ showError: true })
          }
          else {
            this.setState({ messageFromServer: 'recovery email sent' })
            this.setState({emailSent: true})
          }
          // console.log(responseJSON);
        })
        .catch(err => console.error(err))
    }
  };

  render() {
    const { email, messageFromServer, showError } = this.state;
    return (
      <div>
        {!this.state.emailSent
          ? <div className="ForgotEmail">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  id="email"
                  label="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                /></FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit">
                Send password reset email</Button>
            </form>
          </div>
          : <div id="emailSent">
            <p>An email has been sent to set up a new password.</p>
          </div>}
      </div>
    );
  }

    // );
    // return (
    //   <div>
    //     <form className="profile-form" onSubmit={this.sendEmail}>
    //       <TextField
    //         style={inputStyle}
    //         id="email"
    //         label="email"
    //         value={email}
    //         onChange={this.handleChange('email')}
    //         placeholder="Email Address"
    //       />
    //       <SubmitButton
    //         buttonStyle={forgotButton}
    //         buttonText={'Send Password Reset Email'}
    //       />
    //     </form>
    //     {showError && (
    //       <div>
    //         <p>
    //           That email address isn't recognized. Please try again or register
    //           for a new account.
    //         </p>
    //       </div>
    //     )}
    //     {messageFromServer === 'recovery email sent' && (
    //       <div>
    //         <h3>Password Reset Email Successfully Sent!</h3>
    //       </div>
    //     )}
    //   </div>
    // );

}
