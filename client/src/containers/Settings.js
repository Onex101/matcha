import React, { Component } from "react";
// import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { ReactTags } from "react-tag-autocomplete";
import "./Settings.css";
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';
import temp from './imgs/profile-placeholder.png';
const ReactTags = require('react-tag-autocomplete')

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
            tags: [{id: 1, name: "apples"}, {id: 2, name: "pears"}],
            suggestions: [
                { id: 3, name: "Bananas" },
                { id: 4, name: "Mangos" },
                { id: 5, name: "Lemons" },
                { id: 6, name: "Apricots" },
                { id: 1, name: "Lego" }
              ]
        }
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
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
        
        if(this.state.pic1)
            pic1 = this.state.pic1;
        else
            pic1 = temp;

        if(this.state.pic2)
            pic2 = this.state.pic2;
        else
            pic2 = temp;
        
        if(this.state.pic3)
            pic3 = this.state.pic3;
        else
            pic3 = temp;
        
        if(this.state.pic4)
            pic4 = this.state.pic4;
        else
            pic4 = temp;

        return(<div className="imgBar">
                <div className="profile-thumbnail" id="profile" ref="profile">
                    <div className="profile-elems">
                        {this.state.profile ? <img src={this.state.profile} className='profile_thumb' alt="Profile pic"/>
                                            : <img src={temp} className='profile_thumb' alt="Profile pic"/>}
                    </div>
                    <Button
                        bsSize="large"
                        type="submit" 
                        className="submitButton"
                        onClick={(e) => this.handleImgChange('profile', e)} >Update</Button>
                </div>
                <br/>
                <div className="img-thumbnail">
                    <div className="profile-elems">
                        <img src={pic1} className='img_thumb' alt="IMG 1"/>
                    </div>
                    <Button
                        bsSize="large"
                        type="submit" 
                        className="img-submitButton"
                        disabled={!this.profileCheck()}
                        onClick={(e) => this.handleImgChange('img1', e)} >Update</Button>
                </div>
                <div className="img-thumbnail">
                    <div className="profile-elems">
                        <img src={pic2} className='img_thumb' alt="IMG 2"/>
                    </div>
                    <Button
                        bsSize="large"
                        type="submit" 
                        className="img-submitButton"
                        disabled={!this.profileCheck()}
                        onClick={(e) => this.handleImgChange('img2', e)} >Update</Button>
                </div>
                <div className="img-thumbnail">
                    <div className="profile-elems">
                        <img src={pic3} className='img_thumb' alt="IMG 3"/>
                    </div>
                    <Button
                        bsSize="large"
                        type="submit" 
                        className="img-submitButton"
                        disabled={!this.profileCheck()}
                        onClick={(e) => this.handleImgChange('img3', e)} >Update</Button>
                </div>
                <div className="img-thumbnail">
                    <div className="profile-elems">
                        <img src={pic4} className='img_thumb' alt="IMG 4"/>
                    </div>
                    <Button
                        bsSize="large"
                        type="submit" 
                        className="img-submitButton"
                        disabled={!this.profileCheck()}
                        onClick={(e) => this.handleImgChange('img4', e)} >Update</Button>
                </div>
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

    handleImgChange(param, e) {
        e.preventDefault();
        if (param === 'profile')
            this.setState({profile: this.state.imagePreviewUrl});
        else if (param === 'img1')
            this.setState({pic1: this.state.imagePreviewUrl});
        else if (param === 'img2')
            this.setState({pic2: this.state.imagePreviewUrl});
        else if (param === 'img3')
            this.setState({pic3: this.state.imagePreviewUrl});
        else if (param === 'img4')
            this.setState({pic4: this.state.imagePreviewUrl});
      }

    handleDelete (i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }
    
    handleAddition (tag) {
        if (this.state.tags.length < 10){
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })}
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
                            {/* View and edit current images */}
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


                    <FormGroup controlId="pref" bsSize="small">
                        <ControlLabel>Your Tags</ControlLabel>
                        <br/>
                        <ReactTags
                            allowNew = {true}
                            placeholder = 'Add new/existing tag'
                            tags={this.state.tags}
                            inputAttributes= {{onKeyUp:"return forceLower(this)"}} 
                            suggestions={this.state.suggestions}
                            handleDelete={this.handleDelete.bind(this)}
                            handleAddition={this.handleAddition.bind(this)} />
                    </FormGroup>

<br/>
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