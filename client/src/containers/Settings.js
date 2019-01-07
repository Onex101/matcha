import React, { Component } from "react";
// import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Settings.css";
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: '',
            gps_lat: null,
            gps_lon: null,
        }
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    preview(){
        var imagePreviewUrl = this.state.imagePreviewUrl;

        if (imagePreviewUrl) {
            return( <img src={imagePreviewUrl}/>);
        } else {
            return(<div className="previewText">Please select an Image for Preview</div>);
        }
    }

    gallery() {
        var imagePreviewUrl = this.state.imagePreviewUrl;

        if (imagePreviewUrl) {
            return( <img src={imagePreviewUrl}/>);
        } else {
            return(<div className="previewText">Oops, looks like you don't have a profile pic!</div>);
        }
    }

    geoFindMe = () => {     
        if (!navigator.geolocation){
          console.log("Geolocation is not supported by your browser");
          return;
        }
      
        const success = (position) => {
          var latitude  = position.coords.latitude;
          var longitude = position.coords.longitude;
      
          console.log("Latitude is " + latitude + "° Longitude is " + longitude + "°");
          this.setState({gps_lat: latitude});
          this.setState({gps_lon: longitude});
        }
      
        function error() {
            console.log("Unable to retrieve your location");
        //   output.innerHTML = "Unable to retrieve your location";
        }
      
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(success, error);
    }

    render() {
        var style = {
            display: 'flex',
          }
        return (
                // <div className="previewComponent">
                //     <ControlLabel>Upload Images</ControlLabel>
                //     <form onSubmit={(e)=>this._handleSubmit(e)}>
                //         <div style={style}>
                //         <input className="fileInput" 
                //         type="file" 
                //         onChange={(e)=>this._handleImageChange(e)} />
                //         <button className="submitButton" 
                //         type="submit" 
                //         onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                //         </div>
                //     </form>
                //     <div className="imgPreview">
                //         {this.preview()}
                //     </div>
                //     <div className="imgPreview">
                //         {this.gallery()}
                //     </div>
                //     <ControlLabel>Biography</ControlLabel>
                //     <input className="fileInput" 
                //         type="file" 
                //         onChange={(e)=>this._handleImageChange(e)} />
                // </div>
                <div className="settings">
                <ControlLabel>Settings</ControlLabel>
                <ul className="form-fields">
                    <FormGroup bsSize="large">
                        <ControlLabel>Upload Images</ControlLabel>
                        <div className="settings-pictures">
                            <FormControl
                                autoFocus
                                type="file"
                                // defaultValue={this.props.fieldValues.first_name}
                                onChange={(e)=>this._handleImageChange(e)}
                            />
                            <div className="imgPreview">
                                {this.preview()}
                            </div>
                            <Button
                                bsSize="large"
                                type="submit" 
                                className="submitButton"
                                // disabled={!this.validateForm()}
                                // onClick={this.saveAndContinue}
                                onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
                            <div className="imgBar">
                                <div className="img-thumbnail">{/* {this.pictures.1} */}</div>
                                <div className="img-thumbnail">{/* {this.pictures.2} */}</div>
                                <div className="img-thumbnail">{/* {this.pictures.3} */}</div>
                                <div className="img-thumbnail">{/* {this.pictures.4} */}</div>
                                <div className="img-thumbnail">{/* {this.pictures.5} */}</div>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea" controlId="biography" bsSize="small">
                    <ControlLabel>Biography</ControlLabel>
                    <FormControl 
                        componentClass="textarea" 
                        placeholder="Tell us about yourself!"
                        // defaultValue={this.props.profile.biography}
                        // onChange={this.handleChange()} 
                        />
                    </FormGroup>
                    <FormGroup controlId="gender" bsSize="small">
                        <ControlLabel>Your gender</ControlLabel>
                        <br/>
                        <div className="slider-grp">
                            <img src={female} alt="Female" />
                            <FormControl
                            className="slider"
                            autoFocus
                            type="range"
                            min="0" max="1" step="0.01" 
                            // defaultValue={ this.props.fieldValues.gender } 
                            // onChange={({target}) => this.setState({gender: target.value})}
                            />
                            <img src={male} alt="Male" />
                        </div>
                    </FormGroup>

                    <FormGroup controlId="pref" bsSize="small">
                        <ControlLabel>Your Interest</ControlLabel>
                        <br/>
                        <div className="slider-grp">
                            <img src={female} alt="Female" />
                            <FormControl
                            autoFocus
                            type="range"
                            min="0" max="1" step="0.01"
                            // defaultValue={this.props.fieldValues.pref} 
                            // onChange={({target}) => this.setState({pref: target.value})}
                            />
                            <img src={male} alt="Male" />
                        </div>
                    </FormGroup>

                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                // disabled={!this.validateForm()}
                                onClick={this.geoFindMe}
                            >Update Location!
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <br />
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                // disabled={!this.validateForm()}
                                // onClick={this.saveAndContinue}
                            >Save Changes</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </ul>
            </div>
            
        )
    }
}