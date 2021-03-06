import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';
import "./SurveyFields.css";

export default class SurveyFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: props.fieldValues.gender,
            pref: props.fieldValues.pref,
            gps_lat: props.fieldValues.gps_lat,
            gps_lon: props.fieldValues.gps_lon,
        }
        this.submitStep = this.submitStep.bind(this);
        this.addUserPost = this.addUserPost.bind(this);
        // this.geoFindMe = this.geoFindMe.bind(this);
    }

    geoFindMe = () => {

        if (!navigator.geolocation) {
            //   console.log("Geolocation is not supported by your browser");          
            return;
        }

        fetch('https://json.geoiplookup.io/')
                .then(response => response.json())
                .then(data => { if (this.state.gps_lat === null && this.state.gps_lon === null) {this.setState({ gps_lat: data.latitude, gps_lon: data.longitude })}});

        const success = (position) => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            console.log("Latitude is " + latitude + "° Longitude is " + longitude + "°");
            this.setState({ gps_lat: latitude });
            this.setState({ gps_lon: longitude });
        }

        function error() {
            console.log("Unable to retrieve your location");
            
            //   output.innerHTML = "Unable to retrieve your location";
        }

        // console.log("Locating…");
        navigator.geolocation.getCurrentPosition(success, error);
    }

    addUserPost() {
        const user = this.props.fieldValues;
        // fetch(`/products/add?name=${product.name}&price=${product.price}`)
        // .then(response => response.json())
        fetch(`/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.user_name,
                email: user.email,
                password: user.password,
                birth_date: user.birth_date,
                gender: this.state.gender || '0.5',
                pref: this.state.pref || '0.5',
                gps_lat: this.state.gps_lat,
                gps_lon: this.state.gps_lon
            })
        })
            // .then(this.getUsers)
            .catch(err => console.error(err))
    }

    submitStep(e) {
        e.preventDefault()

        //Get values via this.refs
        var data = {
            gender: this.state.gender || '0.5',
            pref: this.state.pref || '0.5'
        }

        this.props.saveValues(data)
        this.addUserPost()
        this.props.nextStep()
    }

    componentWillMount() {
        this.geoFindMe()
    }

    render() {
        return (
            <div>
                <ControlLabel>Your Preferences</ControlLabel>
                <ul className="form-fields">

                    <FormGroup controlId="gender" bsSize="small">
                        <ControlLabel>Your gender</ControlLabel>
                        <br />
                        <div className="slider-grp">
                            <img src={female} alt="Female" />
                            <FormControl
                                className="slider"
                                autoFocus
                                type="range"
                                min="0" max="1" step="0.01"
                                defaultValue={this.props.fieldValues.gender}
                                onChange={({ target }) => this.setState({ gender: target.value })}
                            />
                            <img src={male} alt="Male" />
                        </div>
                    </FormGroup>

                    <FormGroup controlId="pref" bsSize="small">
                        <ControlLabel>Your Interest</ControlLabel>
                        <br />
                        <div className="slider-grp">
                            <img src={female} alt="Female" />
                            <FormControl
                                autoFocus
                                type="range"
                                min="0" max="1" step="0.01"
                                defaultValue={this.props.fieldValues.pref}
                                onChange={({ target }) => this.setState({ pref: target.value })}
                            />
                            <img src={male} alt="Male" />
                        </div>
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
                                    onClick={this.submitStep}
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