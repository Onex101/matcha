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

    // handleConfirmationSubmit = async event => {
    //     event.preventDefault();

    //     this.setState({ isLoading: true });
    //     // 
    //     const confirm = this.state;
    //     const user = this.props.fieldValues;
    //     fetch(`/login`, {
    //       method: "POST",
    //       headers: {
    //           "Content-Type": "application/json; charset=utf-8",
    //       },
    //       body: JSON.stringify({
    //         user_name           : user.user_name,
    //         confirmationCode    : confirm.confirmationCode,
    //       })
    //     })
    //     .then(result => {
    //       console.log(result);
    //     })
    //     .catch(err => console.error(err))
    //   }
    
    // handleConfirmationSubmit = async event => {
    //     event.preventDefault();
      
    //     try {
    //       const user = this.props.fieldValues;
    //       console.log(user.user_name);
    //         console.log(this.state.confirmationCode);
    //       fetch(`/signup/verify`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //         },
    //         body: JSON.stringify({
    //           user_name         :  user.user_name,
    //           veri_code         :  this.state.confirmationCode,
    //         })
    //       })
    //       .then(response => response.json())
    //       .then((responseJSON) => {
    //           console.log(responseJSON);
    //           // console.log(responseJSON);
    //         if (responseJSON["success"] || responseJSON["error"]) {
    //             if (responseJSON["error"] === null && responseJSON["success"] === "veri-code is correct") {
    //                 //Do the success things
    //                 this.props.nextStep();
    //             } else if (responseJSON["error"] === "verification update fail" && responseJSON["success"] === null){
    //                 alert("Invalid Confirmation Code!");
    //                 this.setState({ isLoading: false });
    //             } 
    //         }
    //         else {
    //             alert("Something went wrong :(");
    //             this.setState({ isLoading: false });
    //         }
    //       })
    //       .catch(err => console.error(err))
    //       } catch (e) {
    //         alert(e.message);
    //       }
    //     // 
    // }

    render() {
        return (
        <div>
            {/* <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                    autoFocus
                    type="tel"
                    defaultValue={this.state.confirmationCode}
                    onChange={this.handleChange}
                /> */}
                <HelpBlock>A verification code has been sent to you. Please check your email for the code.</HelpBlock>
                {/* </FormGroup>

                <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateConfirmationForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Verify"
                loadingText="Verifying…"
                /> */}


                {/* Temporary for test */}
                {/* <ButtonToolbar>
                    <ButtonGroup>
                        <Button
                            bsSize="large"
                            onClick={this.props.previousStep}
                            >
                            Back
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
                </form> */}
        </div>
        )
    }
}