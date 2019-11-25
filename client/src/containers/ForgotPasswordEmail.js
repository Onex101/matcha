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
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.validateEmail(this.state.email)) {
            //   Verify and Send password reset email

            // 1 checck if email is in the database
            // 2 if so, send verification email

            // try {
            //   const user = this.state;
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
            //   .then(response => response.json())
            //   .then((responseJSON) => {
            //       console.log(responseJSON);
            //       if (responseJSON["success"]) {
            //         if (responseJSON["success"] === "login sucessfull") {
            //           this.props.userHasAuthenticated(true);
            //           this.props.setUser(responseJSON["user"]);
            //           this.props.history.push("/");
            //         } else if (responseJSON["success"] === "Username and password does not match"){
            //           alert(responseJSON["success"]);
            //         } else if (responseJSON["success"] === "Username does not exist"){
            //           alert(responseJSON["success"]);}
            //       }
            //       else
            //       alert("Something went wrong :(");
            //   })
            //   .catch(err => console.error(err))
            //   } catch (e) {
            //     alert(e.message);
            //   }
            this.setState({ emailSent: true });
        }
       
    }

    render() {
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
                                    value={this.state.email}
                                    onChange={this.handleChange}
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
}
