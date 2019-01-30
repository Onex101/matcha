import React, { Component } from 'react';

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      update: false,
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
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
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

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
            <SubmitButtons
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