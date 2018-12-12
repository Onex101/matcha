import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class SurveyFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: "",
            pref: ""
        }
        this.nextStep = this.nextStep.bind(this);
    }

    // nextStep() {
    nextStep(e) {
        e.preventDefault()

        //Get values via this.refs
        var data = {
            gender: this.state.gender,
            pref: this.state.pref
        }

        this.props.saveValues(data)
        this.props.addUserPost()
        this.props.nextStep()
    }

    addUserPost = _ => {
        const {user} = this.props.fieldValues;
        // fetch(`/products/add?name=${product.name}&price=${product.price}`)
        // .then(response => response.json())
        fetch(`/user/create`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            // first_name: user.first_name,
            // last_name: user.last_name,
            user_name:  user.user_name,
            email:      user.email,
            password:   user.password,
            birthdate:  user.birthdate,
            gender:     user.gender,
            pref:       user.pref
          })
        })
        // .then(this.getUsers)
        .catch(err => console.error(err))
    }
 
    render() {
        return (
            <div>
                <ControlLabel>Your Preferences</ControlLabel>
                <ul className="form-fields">

                    <FormGroup controlId="gender" bsSize="large">
                        <ControlLabel>Your gender</ControlLabel>
                        <FormControl
                        autoFocus
                        type="range"
                        min="0" max="1" step="0.01" 
                        defaultValue={ this.props.fieldValues.gender } 
                        onChange={({target}) => this.setState({gender: target.value})}
                        />
                    </FormGroup>

                    <FormGroup controlId="pref" bsSize="large">
                        <ControlLabel>Your Interest</ControlLabel>
                        <FormControl
                        autoFocus
                        type="range"
                        min="0" max="1" step="0.01"
                        defaultValue={this.props.fieldValues.pref} 
                        onChange={({target}) => this.setState({pref: target.value})}
                        />
                    </FormGroup>
                    <ButtonToolbar>
                        <div className="btn -default pull-left">
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                onClick={this.props.previousStep}
                                >
                                Back
                            </Button>
                        </ButtonGroup>
                        </div>
                        <div className="btn -default pull-right">
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                onClick={this.nextStep}
                                >
                                Submit
                            </Button>
                        </ButtonGroup>
                        </div>
                    </ButtonToolbar>
                </ul>
            </div>
        )
    }
}