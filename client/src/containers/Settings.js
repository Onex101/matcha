import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
        // this.submitStep = this.submitStep.bind(this);
        // this.addUserPost = this.addUserPost.bind(this);
        // this.geoFindMe = this.geoFindMe.bind(this);
    }
    
    
    render() {
        return (
            <div>
                <ControlLabel>Upload Images</ControlLabel>
                <ul className="form-fields">

                   
                </ul>
                <ControlLabel>Bio</ControlLabel>
            </div>
        )
    }
}