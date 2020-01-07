import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import "./Search.css";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: null,
            searchAgeInput: 0,
            searchFameInput: 0,
            searchLocationInput: null,
            searchTagsInput: null,
        }
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    // Stops the auto focus on the tags
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {

    }

    handleSearchChange = event => {
        this.setState({
            searchType: event.value
        });
    }

    isInt(value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
    }

    searchAge = async event => {
        event.preventDefault();
        console.log(this.state.searchAgeInput)
        if (this.isInt(this.state.searchAgeInput) && this.props.userInfo.id) {
            console.log("SUCCESS")
            console.log(this.props.userInfo.id)

            // '/agesearch/:user_id/:x'

            try {
				fetch('/agesearch/' + this.props.userInfo.id + '/' + this.state.searchAgeInput, {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						console.log("Age search response: ", responseJSON)
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert(e.message);
			}
        } else {
            alert("Please insert a number.");
        }
    }

    renderSearchType() {
        if (this.state.searchType == "Age") {
            return (<div id="age-search">search by age
                <FormGroup controlId="searchAgeInput" bsSize="small">
                    <ControlLabel>Max Age Gap</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        defaultValue={this.state.searchAgeInput}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button
                            bsSize="large"
                            className="submit_btn"
                            onClick={(e) => this.searchAge(e)} >Search</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div >)
        } else if (this.state.searchType == "Fame") {
            return (<div>search by fame</div>)
        } else if (this.state.searchType == "Location") {
            return (<div>search by location</div>)
        } else if (this.state.searchType == "Tags") {
            return (<div>search by tags</div>)
        }
    }

    render() {
        const options = [
            'Age', 'Fame', 'Location', 'Tags'
        ]
        return (
            <div className="search">
                <div className="searchParameters">
                    <ControlLabel>Search by</ControlLabel>
                    <Dropdown options={options} onChange={this.handleSearchChange} value={this.state.searchType} placeholder="Select an option" ControlLabel="searchType" />
                </div>
                <div className="searchResults">
                    {this.state.searchType ? this.renderSearchType() : null}
                </div>
            </div>
            // this.state.id ?
            // <div className="settings">
            // 	<ControlLabel>Settings</ControlLabel>
            // 	<ul className="form-fields">
            // 		<FormGroup bsSize="large">
            // 			<ControlLabel>Upload Images</ControlLabel>
            // 			<div className="settings-pictures">
            // 				{/* View and edit current images */}
            // 				{this.pics()}
            // 				<br />
            // 				<FormControl
            // 					autoFocus
            // 					type="file"
            // 					// defaultValue={this.props.fieldValues.first_name}
            // 					onChange={(e) => this._handleImageChange(e)}
            // 				/>
            // 				<div className="imgPreview">{this.preview()}</div>
            // 			</div>
            // 		</FormGroup>
            // 		<FormGroup controlId="firstname" bsSize="small">
            // 			<ControlLabel>First Name</ControlLabel>
            // 			<FormControl
            // 				componentClass="textarea"
            // 				defaultValue={this.state.firstname}
            // 				onChange={this.handleChange}
            // 			/>
            // 		</FormGroup>
            // 		<FormGroup controlId="lastname" bsSize="small">
            // 			<ControlLabel>Last Name</ControlLabel>
            // 			<FormControl
            // 				componentClass="textarea"
            // 				defaultValue={this.state.lastname}
            // 				onChange={this.handleChange}
            // 			/>
            // 		</FormGroup><FormGroup controlId="email" bsSize="small">
            // 			<ControlLabel>Email</ControlLabel>
            // 			<FormControl
            // 				componentClass="textarea"
            // 				defaultValue={this.state.email}
            // 				onChange={this.handleChange}
            // 			/>
            // 		</FormGroup>
            // 		<FormGroup controlId="bio" bsSize="small">
            // 			<ControlLabel>Biography</ControlLabel>
            // 			<FormControl
            // 				componentClass="textarea"
            // 				placeholder="Tell us about yourself!"
            // 				defaultValue={this.state.bio}
            // 				onChange={this.handleChange}
            // 			/>
            // 		</FormGroup>
            // 		<FormGroup controlId="gender" bsSize="small">
            // 			<ControlLabel>Your gender</ControlLabel>
            // 			<br />
            // 			<div className="slider-grp">
            // 				<img src={female} alt="Female" />
            // 				<FormControl
            // 					className="slider"
            // 					autoFocus
            // 					type="range"
            // 					min="0" max="1" step="0.01"
            // 					defaultValue={this.state.gender}
            // 					onChange={this.handleChange}
            // 				/>
            // 				<img src={male} alt="Male" />
            // 			</div>
            // 		</FormGroup>
            // 		<FormGroup controlId="pref" bsSize="small">
            // 			<ControlLabel>Your Interest</ControlLabel>
            // 			<br />
            // 			<div className="slider-grp">
            // 				<img src={female} className='gender' alt="Female" />
            // 				<FormControl
            // 					autoFocus
            // 					type="range"
            // 					min="0" max="1" step="0.01"
            // 					defaultValue={this.state.pref}
            // 					onChange={this.handleChange}
            // 				/>
            // 				<img src={male} alt="Male" />
            // 			</div>
            // 		</FormGroup>
            // 		<FormGroup controlId="tags" bsSize="small">
            // 			<ControlLabel>Your 10 Tags</ControlLabel>
            // 			<br />
            // 			{this.renderTags()}
            // 		</FormGroup>
            // 		<br />
            // 		<ButtonToolbar>
            // 			<ButtonGroup>
            // 				<Button
            // 					bsSize="large"
            // 					className="submit_btn"
            // 					onClick={this.geoFindMe} >Update Location!</Button>
            // 			</ButtonGroup>
            // 		</ButtonToolbar>
            // 		<br />
            // 		<ButtonToolbar>
            // 			<ButtonGroup>
            // 				<Button
            // 					bsSize="large"
            // 					className="submit_btn"
            // 					onClick={(e) => this.saveChanges(e)} >Save Changes</Button>
            // 			</ButtonGroup>
            // 		</ButtonToolbar>
            // 	</ul>
            // </div>
            // : <ControlLabel> Loading ... </ControlLabel>
        )
    }
}