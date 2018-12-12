import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Calendar from 'ciqu-react-calendar';

export default class AccountFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name: "",
            password: "",
            email: "",
            birthdate: ""
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    onChange = (value, inputValue) => {
        console.log(value.format('YYYY-MM-DD'))
        this.setState({ birthdate: value })
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
            user_name: this.state.user_name,
            password: this.state.password,
            email: this.state.email,
            birthdate: this.state.birthdate
        }

        this.props.saveValues(data)
        this.props.nextStep()
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
                    <FormGroup controlId="user_name" bsSize="large">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            defaultValue={this.props.fieldValues.user_name}
                            onChange={({ target }) => this.setState({ user_name: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.password}
                            onChange={({ target }) => this.setState({ password: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            defaultValue={this.props.fieldValues.email}
                            onChange={({ target }) => this.setState({ email: target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="birthdate" bsSize="large">
                        <ControlLabel>Birthdate</ControlLabel>
                        <div style={closedCal}>
                            <Calendar
                                onChange={onChange}
                                allowClear={true}
                                disabled={false}
                                defaultValue={this.props.fieldValues.birthdate}
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