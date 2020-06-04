import React, { Component } from "react";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Calendar from 'ciqu-react-calendar';
import "./Accountfields.css";

export default class AccountFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: props.fieldValues.user_name,
            last_name: props.fieldValues.user_name,
            user_name: props.fieldValues.user_name,
            password: props.fieldValues.password,
            confirmPassword: "",
            email: props.fieldValues.email,
            birth_date: props.fieldValues.birth_date
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    onChange = (value, inputValue) => {
        // console.log(value.format('YYYY-MM-DD'))
        this.setState({ birth_date: value })
    }
    onOpenChange = (status) => {
        // console.log('open status: ' + status)
    }
    disabledDate = (currentDate, inputValue) => {
        return false
    }

    saveAndContinue(e) {
        e.preventDefault()
        if (this.validateEmail(this.state.email) && this.validatePassword(this.state.password)) {
            try {
                const user = this.state;

                fetch(`/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        user_name: user.user_name,
                        email: user.email,
                    })
                })
                    .then(response => response.json())
                    .then((responseJSON) => {
                        if (responseJSON["exists"]) {
                            if (responseJSON["exists"] === "null") {
                                if (this.state.password !== this.state.confirmPassword) {
                                    alert("Your password's do not match!");
                                    return false;
                                }
                                else {
                                    //Get values via this.refs
                                    var data = {
                                        first_name: this.state.first_name,
                                        last_name: this.state.last_name,
                                        user_name: this.state.user_name,
                                        password: this.state.password,
                                        email: this.state.email,
                                        birth_date: this.state.birth_date
                                    }
                                    this.props.saveValues(data)
                                    this.props.nextStep()
                                }
                            } else if (responseJSON["exists"] === "user_name") {
                                alert("Username already exists!");
                            } else if (responseJSON["exists"] === "email") {
                                alert("Email already exists!");
                            }
                        }
                        else
                            alert("Something went wrong :(");
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        }
    }

    validatePassword(inputtxt) {
        var passw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
        if (passw.test(inputtxt)) {
            return true;
        }
        else {
            alert('Invalid password! Please use a password more than 4 characters long, with at least one uppercase letter, lowercase letter, one digit and one special symbol')
            return false;
        }
    }

    validateEmail(mail) {
        var re = /\S+@\S+\.\S+/;
        if (re.test(mail)) {
            console.log(mail)
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    validateForm() {
        if (this.state.email != null &&
            this.state.password != null &&
            this.state.confirmPassword != null &&
            this.state.first_name != null &&
            this.state.last_name != null &&
            this.state.user_name != null &&
            this.state.birth_date != null) {
            return true;
        }
        else {
            return false;
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    //Todo:
    // First Name, Last Name, UserName
    // Confirm Password
    // Cannot Submit/Continue unless all fields are filled

    checkPassword(inputtxt) {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
        if (inputtxt.value.match(paswd)) {
            alert('Correct, try another...')
            return true;
        }
        else {
            alert('Wrong...!')
            return false;
        }
    }

    render() {
        const { onChange, onOpenChange, disabledDate } = this;

        const closedCal = {
            margin: "0px 0px 50px 0px"
        };

        return (
            <div>
                <ControlLabel>Account Details</ControlLabel>
                <HelpBlock>Please fill in all the fields below.</HelpBlock>
                <ul className="form-fields">
                    <FormGroup controlId="first_name" bsSize="large">
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            defaultValue={this.props.fieldValues.first_name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="last_name" bsSize="large">
                        <ControlLabel>Surname</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            defaultValue={this.props.fieldValues.last_name}
                            onChange={({ target }) => this.setState({ last_name: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="user_name" bsSize="large">
                        <ControlLabel>Userame</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            defaultValue={this.props.fieldValues.user_name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.confirmPassword}
                            onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            defaultValue={this.props.fieldValues.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="birth_date" bsSize="large">
                        <ControlLabel>Birthdate</ControlLabel>
                        <div style={closedCal}>
                            <Calendar
                                onChange={onChange}
                                allowClear={true}
                                disabled={false}
                                defaultValue={this.props.fieldValues.birth_date}
                                format={'YYYY-MM-DD'}
                                onOpenChange={onOpenChange}
                                disabledDate={disabledDate}
                            />
                        </div>
                    </FormGroup>

                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                disabled={!this.validateForm()}
                                onClick={this.saveAndContinue}
                            >
                                Save &amp; Continue
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </ul>
            </div>
        );
    }
}