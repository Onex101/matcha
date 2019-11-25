import React, { Component } from 'react';
import { TextField, inputStyle, SubmitButton, forgotButton} from "react-bootstrap";


class ForgotPassword extends Component {
	constructor() {
	super();

	this.state = {
			email: '',
			showError: false,
			messageFromServer: '',
		};
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = e => {
	e.preventDefault();
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
			if (responseJSON.error){
				this.setState({showError: true})
			}
			else{
				this.setState({messageFromServer: 'recovery email sent'})
			}
			console.log(responseJSON);
		})
	  .catch(err => console.error(err))
  };

  render() {
    const { email, messageFromServer, showError } = this.state;

    return (
      <div>
        <form className="profile-form" onSubmit={this.sendEmail}>
          <TextField
            style={inputStyle}
            id="email"
            label="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="Email Address"
          />
          <SubmitButton
            buttonStyle={forgotButton}
            buttonText={'Send Password Reset Email'}
          />
        </form>
        {showError && (
          <div>
            <p>
              That email address isn't recognized. Please try again or register
              for a new account.
            </p>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPassword;