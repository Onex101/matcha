import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "../components/AppliedRoute";
import Routes from "../Routes";

import AccountFields from "../containers/Accountfields";
import SurveyFields from "../containers/SurveyFields";
import Confirmation from "../containers/Confirmation";
import Success from "../containers/Success";

var fieldValues = {
    user_name        : null,
    email       : null,
    password    : null,
    birthdate   : null,
    gender      : null,
    pref        : null
}

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }
    
    getInitialState() {
        return {
            step: 1
        }
    }

    saveValues(field_value) {
        return function() {
            // 'fieldValues' is set at the top of this file. 
            // We are appending to and overriding keys in 'fieldValues' with the 'fields' with Object.assign
            fieldValues = Object.assign({}, fieldValues, field_value)
        }.bind(this)()
    }

    nextStep() {
        this.setState({
            step : this.state.step + 1
        })
    }

    previousStep() {
        this.setState({
            step : this.state.step - 1
        })
    }

    submitRegistration() {
        //Handle via ajax submitting the user data
        //On Success, return this.nextStep()
        //If it failes, show the error but don't advance
        this.nextStep()
    }

    // When the component is first loaded (step 1) show the Account Field
    // At 2, show Survey Questions, at 3, the Confirmation, at 4 The success message
    // Each of these are a Reeact Component
    showStep() {
        switch (this.state.step) {
            case 1:
                return <AccountFields fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} /> // Fields used to create a new account
            case 2:
                return <SurveyFields  fieldValues={fieldValues} nextStep={this.nextStep} previousStep={this.previousStep} saveValues={this.saveValues} />
            case 3:
                return <Confirmation fieldValues={fieldValues} previousStep={this.previousStep} submitRegistration={this.submitRegistration} />
            case 4:
                return <Success fieldValues={fieldValues} />
        }
    }

    render() {
        var style = {
            width : (this.state.step / 4 * 100) + '%'
        }

        return (
            <div className="Signup">
                <span className="progress-step">Step {this.state.step}</span>
                <progress className="progress" style={style}></progress>
                {this.showStep()}
            </div>
        )
    }
}