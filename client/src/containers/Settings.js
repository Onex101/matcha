import React, { Component } from "react";
// import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Settings.css";
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';
import temp from './imgs/profile-placeholder.png';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: '',
            profile: null,
            pictures: [],
            pic1: null,
            pic2: null,
            pic3: null,
            pic4: null,
            bio: null,
            gender: null,
            pref: null,
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
            return( <img src={imagePreviewUrl} className="preview" alt="Preview"/>);
        } else {
            return(<div className="previewText">Please select an Image for Preview</div>);
        }
    }

    profileCheck(){
        if (this.state.profile === null)
            return false
        else
            return true

    }

    pics(){
        var profile, pic1, pic2, pic3, pic4;

        if(this.state.profile)
            profile = this.state.profile;
        else
            profile = temp;
        
        if(this.state.pictures[1])
            pic1 = this.state.pictures[1];
        else
            pic1 = temp;

        if(this.state.pictures[2])
            pic2 = this.state.pictures[2];
        else
            pic2 = temp;
        
        if(this.state.pictures[3])
            pic3 = this.state.pictures[3];
        else
            pic3 = temp;
        
        if(this.state.pictures[4])
            pic4 = this.state.pictures[4];
        else
            pic4 = temp;

        return(<div className="imgBar">
            <div className="img-thumbnail" id="profile" ref="profile">
                {this.state.profile ? <img src={this.state.profile} className='profile_thumb' alt="Profile pic"/>
                                    : <img src={temp} className='profile_thumb' alt="Profile pic"/>}
                <Button
                    bsSize="large"
                    type="submit" 
                    className="submitButton"
                    // disabled={!this.profileCheck()}
                    // onClick={this.saveAndContinue}
                    // controlid="profile"
                    // onClick={(e)=>this._handleSubmit(e)}
                    onClick={this.handleImgChange} 
                    // onClick={({target}) => this.setState({pic[1]: target.value})}
                    // onClick={this.handleChange} 
                    >Upload Image</Button>
            </div><br/>
            {/* <div className="img-thumbnail" style={{width:'16%', minWidth: "33px", minHeight: "40px"}}>
                <img src={pic1} style={{width:'100%'}} alt="IMG 1"/>
                <Button
                    bsSize="large"
                    type="submit" 
                    className="submitButton"
                    disabled={!this.profileCheck()}
                    // onClick={this.saveAndContinue}
                    onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
            </div> */}
            {/* <div className="img-thumbnail" style={{width:'16%', minWidth: "33px"}}>
                <img src={pic2} style={{width:'100%'}} alt="IMG 2"/>
                <Button
                    bsSize="large"
                    type="submit" 
                    className="submitButton"
                    disabled={!this.profileCheck()}
                    // onClick={this.saveAndContinue}
                    onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
            </div> */}
            {/* <div className="img-thumbnail" style={{width:'16%', minWidth: "33px"}}>
                <img src={pic3} style={{width:'100%'}} alt="IMG 3"/>
                <Button
                    bsSize="large"
                    type="submit" 
                    className="submitButton"
                    disabled={!this.profileCheck()}
                    // onClick={this.saveAndContinue}
                    onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
            </div> */}
            {/* <div className="img-thumbnail" style={{width:'16%', minWidth: "33px"}}>
                <img src={pic4} style={{width:'100%'}} alt="IMG 4"/>
                <Button
                    bsSize="large"
                    type="submit" 
                    className="submitButton"
                    disabled={!this.profileCheck()}
                    // onClick={this.saveAndContinue}
                    onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
                </div> */}
            </div>
        )
    }

    gallery() {
        var imagePreviewUrl = this.state.imagePreviewUrl;

        if (imagePreviewUrl) {
            return( <img src={imagePreviewUrl} alt="Preview"/>);
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleImgChange = event => {
    event.preventDefault();
    console.log("Image Test")
    this.setState({
        profile: this.state.imagePreviewUrl
    });
    }

    render() {
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
                            {this.pics()}
                            <br/>
                            <FormControl
                                autoFocus
                                type="file"
                                // defaultValue={this.props.fieldValues.first_name}
                                onChange={(e)=>this._handleImageChange(e)}
                            />
                            <div className="imgPreview">{this.preview()}</div> 
                        </div>
                    </FormGroup>
                    <FormGroup controlId="bio" bsSize="small">
                    <ControlLabel>Biography</ControlLabel>
                    <FormControl 
                        componentClass="textarea" 
                        placeholder="Tell us about yourself!"
                        // id="bio"
                        // defaultValue={this.props.profile.biography}
                        onChange={this.handleChange} 
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
                            onChange={this.handleChange} 
                        // onChange={({target}) => this.setState({gender: target.value})}
                            />
                            <img src={male} alt="Male" />
                        </div>
                    </FormGroup>

                    <FormGroup controlId="pref" bsSize="small">
                        <ControlLabel>Your Interest</ControlLabel>
                        <br/>
                        <div className="slider-grp">
                            <img src={female} className='gender' alt="Female" />
                            <FormControl
                            autoFocus
                            type="range"
                            min="0" max="1" step="0.01"
                            // defaultValue={this.props.fieldValues.pref} 
                            onChange={this.handleChange} 
                            // onChange={({target}) => this.setState({pref: target.value})}
                            />
                            <img src={male} alt="Male" />
                        </div>
                    </FormGroup>

                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                className="submit_btn"
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
                                className="submit_btn"
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