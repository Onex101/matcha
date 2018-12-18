import React, { Component } from "react";
// import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Settings.css";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: ''
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
                <div>
                <ControlLabel>Settings</ControlLabel>
                {/* <HelpBlock>Please fill in all the fields below.</HelpBlock> */}
                <ul className="form-fields">
                    <FormGroup controlId="profile" bsSize="large">
                        <ControlLabel>Upload Images</ControlLabel>
                        <FormControl
                            autoFocus
                            type="file"
                            // defaultValue={this.props.fieldValues.first_name}
                            onChange={this.handleImageChange}
                        />
                        <div controlId="propilePic"></div>
                    </FormGroup>

                    <FormGroup controlId="biography" bsSize="small">
                        <ControlLabel>Biography</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            // defaultValue={this.props.fieldValues.last_name}
                            // onChange={({ target }) => this.setState({ last_name: target.value })}
                        />
                    </FormGroup>
                    
                    {/* <FormGroup controlId="user_name" bsSize="large">
                        <ControlLabel>Userame</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            defaultValue={this.props.fieldValues.user_name}
                            onChange={this.handleChange}
                        />
                    </FormGroup> */}

                    {/* <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup> */}

                    {/* <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            defaultValue={this.props.fieldValues.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </FormGroup> */}

                    {/* <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            defaultValue={this.props.fieldValues.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup> */}

                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                // disabled={!this.validateForm()}
                                // onClick={this.saveAndContinue}
                            >
                                Save &amp; Continue
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </ul>
            </div>
            
        )
    }
}