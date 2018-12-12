import React, { Component } from "react";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../components/LoaderButton';

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: false,
            confirmationCode: "",
            newUser: null
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }
    
    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
      }

    handleSubmit = async event => {
    event.preventDefault();

        this.setState({ isLoading: true });

        this.setState({ newUser: "test" });

        this.setState({ isLoading: false });
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                    autoFocus
                    type="tel"
                    defaultValue={this.state.confirmationCode}
                    onChange={this.handleChange}
                />
                <HelpBlock>Please check your email for the code.</HelpBlock>
                </FormGroup>

                <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateConfirmationForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Verify"
                loadingText="Verifying…"
                />


                {/* Temporary for test */}
                <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                onClick={this.props.previousStep}
                                >
                                Back
                            </Button>
                        </ButtonGroup>
                       
                    </ButtonToolbar>
                    </form>
        </div>
        )
    }
}