import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ForgotPasswordEmail.css";

export default class ForgotPasswordEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailSent: false
        };
    }

    validateForm() {
        return this.state.email.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateEmail(mail) {
        var re = /\S+@\S+\.\S+/;
        if (re.test(mail)) {
            // console.log(mail)
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.validateEmail(this.state.email)) {
            //   Verify and Send password reset email

            //Tutorial: https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7
            try {
                const data = this.state;
                fetch(`/email/check`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        email: data.email
                    })
                })
                    .then(response => response.json())
                    .then((responseJSON) => {
                        console.log(responseJSON);
                        if (responseJSON["error"] === null) {
                            this.setState({ emailSent: true });
                        }
                        else
                            alert("Something went wrong :(\n" + responseJSON["error"]);
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
            this.setState({ emailSent: true });
        }
    }

    render() {
        return (
            <div>
                {!this.state.emailSent
                    ? <div data-testid="notSent" className="ForgotEmail">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    data-testid="emailInput"
                                    autoFocus
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                >
                                </FormControl>
                                
                                </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit">
                                Send password reset email</Button>
                        </form>
                    </div>
                    : <div data-testid="sent" id="emailSent">
                        <p>An email has been sent to set up a new password.</p>
                    </div>}
            </div>

        );
    }
}
