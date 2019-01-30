import React, { Component } from 'react';

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      user_name: '',
      password: '',
      confirmPassword: '',
      update: false,
      isLoading: true,
	  error: false,
	  errorMessage: '',
    };
  }

  componentDidMount() {
	const {user_name, vericode} = this.state
	fetch(`/password_reset/` + user_name + '/' + vericode, {
		method: "GET",
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
				this.setState({error: true, errorMessage: error})
			}
			console.log(responseJSON);
		})
	  .catch(err => console.error(err))
    // get user info from link sent - check if code is the same
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
	// changeg password on submit
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
    const { password, error, isLoading, updated, errorMessage} = this.state;

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
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              onChange={this.handleChange('password')}
              value={password}
              type="password"
            />
            <SubmitButton
              buttonStyle={updateButton}
              buttonText={'Update Password'}
            />
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