import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Calendar from 'ciqu-react-calendar';

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
        console.log(value.format('YYYY-MM-DD'))
        this.setState({ birth_date: value })
    }
    onOpenChange = (status) => {
        console.log('open status: ' + status)
    }
    disabledDate = (currentDate, inputValue) => {
        return false
    }

    saveAndContinue(e) {
        e.preventDefault()

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

    validateForm(){
        // if (this.state.email.length > 0) {
            return (
                // false
                this.state.email != null &&
                // this.state.email.length > 0 &&
                this.state.password != null &&
                // this.state.password.length > 0
                this.state.first_name != null &&
                this.state.last_name != null &&
                this.state.user_name != null &&
                this.state.birth_date != null &&
                this.state.password === this.state.confirmPassword
                // this.state.password === this.state.confirmPassword
            );
        // }
        // else
            // return (true);
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

    render() {
        const { onChange, onOpenChange, disabledDate } = this;

        const closedCal = {
            margin: "0px 0px 50px 0px"
        };

        return (
            <div>
                <ControlLabel>Account Details</ControlLabel>
                <ul className="form-fields">
                <FormGroup controlId="first_name" bsSize="large">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        defaultValue={this.props.fieldValues.first_name}
                        onChange={this.handleChange}
                        // onChange={({ target }) => this.setState({ first_name: target.value })}
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
                            // onChange={({ target }) => this.setState({ user_name: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.password}
                            onChange={this.handleChange}
                            // onChange={({ target }) => this.setState({ password: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.confirmPassword}
                            onChange={this.handleChange}
                            // onChange={({ target }) => this.setState({ password: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            defaultValue={this.props.fieldValues.email}
                            onChange={this.handleChange}
                            // onChange={({ target }) => this.setState({ email: target.value })}
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