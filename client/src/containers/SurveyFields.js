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
        this.props.nextStep()
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