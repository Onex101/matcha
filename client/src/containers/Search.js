import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import UserList from "../components/UserList";
import "./Search.css";
const ReactTags = require('react-tag-autocomplete')

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: null,
            searchAgeInput: "0",
            searchFameInput: "0",
            searchLocationInput: null,
            searchTagsInput: [],
            searchResults: null,
            showResults: false,
            tagSuggestions: null,
            locationSuggestions: null,
        }
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getInterests() {
        try {
            fetch('/interests/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(response => response.json())
                .then((responseJSON) => {
                    this.setState({ tagSuggestions: responseJSON })
                })
                .catch(err => console.error(err))
        } catch (e) {
            alert(e.message);
        }
    }

    convertCoordinates(lat, long) {
        console.log("Lat: " + lat + " Long: " + long)
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + "AIzaSyDKEXlzFbGtbXxHkUy6GSdFCofq5BI_oVo")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                var location = null;
                for (var x in responseJson) {
                    for (var y in responseJson[x]) {
                        if (typeof responseJson[x][y] == "object" && "types" in responseJson[x][y]) {
                            if (responseJson[x][y]["types"][0] == "administrative_area_level_2") {
                                location = responseJson[x][y]["formatted_address"];
                            }
                        }
                    }
                }
                if (location == null)
                    for (var x in responseJson) {
                        for (var y in responseJson[x]) {
                            if (typeof responseJson[x][y] == "object" && "types" in responseJson[x][y]) {
                                if (responseJson[x][y]["types"][0] == "establishment") {
                                    location = responseJson[x][y]["formatted_address"];
                                }
                            }
                        }
                    }
                    console.log("Location: " + location)
                return (location);
            })
    }

    getLocationSuggestions() {
        try {
            fetch('/locations/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(response => response.json())
                .then((responseJSON) => {
                    // console.log("LOCATIONS: ")
                    console.info(responseJSON)
                    var locations = [];
                    // for (var elem in responseJSON) {
                    //     locations.push(this.convertCoordinates(responseJSON[elem].gps_lat, responseJSON[elem].gps_lon))
                    // }
                    var ret = this.convertCoordinates(responseJSON[1].gps_lat, responseJSON[1].gps_lon);
                    console.log("RET: " + ret)
                    locations.push(ret)

                    console.log(locations);
                    this.setState({ locationSuggestions: responseJSON })
                })
                .catch(err => console.error(err))
        } catch (e) {
            alert(e.message);
        }
    }

    // Stops the auto focus on the tags
    componentDidMount() {
        if (this.state.tagSuggestions === null) {
            this.getInterests()
        }
        if (this.state.locationSuggestions === null) {
            this.getLocationSuggestions()
        }
    }

    componentDidUpdate() {
        if (this.state.tagSuggestions === null) {
            this.getInterests()
        }
        if (this.state.locationSuggestions === null) {
            this.getLocationSuggestions()
        }
    }

    handleSearchChange = event => {
        this.setState({
            searchType: event.value
        });
    }
    // Handle Delete of Tag
    handleDelete(i) {
        const tagDelete = this.state.searchTagsInput[i]
        console.log("Deleting tags: ")
        console.info(tagDelete)
        const tags = this.state.searchTagsInput.slice(0)
        tags.splice(i, 1)
        this.setState({ searchTagsInput: tags })
    }

    // Handle Addition of Tag to user profile    
    handleAddition(tag) {
        const tags = this.state.searchTagsInput;
        tag.name = tag.name.toLowerCase();
        if (tags.length < 10) {
            tags.push({ id: tag.id, name: tag.name })
            this.setState({ searchTagsInput: tags })
        }
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
            // console.log("SUCCESS")
            // console.log(this.props.userInfo.id)

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
                        this.setState({ showResults: true, searchResults: responseJSON })
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        } else {
            alert("Please insert a number.");
        }
    }

    searchFame = async event => {
        event.preventDefault();
        console.log(this.state.searchFameInput)
        if (this.isInt(this.state.searchFameInput) && this.props.userInfo.id) {
            // TODO Not returning valid results

            try {
                fetch('/famesearch/' + this.props.userInfo.id + '/' + this.state.searchFameInput, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                })
                    .then(response => response.json())
                    .then((responseJSON) => {
                        console.log("Fame search response: ", responseJSON)
                        this.setState({ showResults: true, searchResults: responseJSON })
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        } else {
            alert("Please insert a number.");
        }
    }
    searchLocation = async event => {
        event.preventDefault();
    }

    searchTags = async event => {
        event.preventDefault();
        console.log(this.state.searchTagsInput)
        if (this.state.searchTagsInput.length > 0 && this.props.userInfo.id) {
            // TODO Not returning valid results

            try {
                fetch('/famesearch/' + this.props.userInfo.id + '/' + this.state.searchFameInput, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                })
                    .then(response => response.json())
                    .then((responseJSON) => {
                        console.log("Fame search response: ", responseJSON)
                        this.setState({ showResults: true, searchResults: responseJSON })
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        } else {
            alert("Please insert at least one tag.");
        }
    }

    renderSearchType() {
        if (this.state.searchType == "Age") {
            return (<div id="age-search">
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
            return (<div id="fame-search">
                <FormGroup controlId="searchFameInput" bsSize="small">
                    <ControlLabel>Fame</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        defaultValue={this.state.searchFameInput}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button
                            bsSize="large"
                            className="submit_btn"
                            onClick={(e) => this.searchFame(e)} >Search</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div >)
        } else if (this.state.searchType == "Location") {
        } else if (this.state.searchType == "Tags") {
            // return (<div>search by tags</div>)
            if (this.state.searchTagsInput && this.state.searchTagsInput.constructor === Array && this.state.tagSuggestions) {
                return (<div id="fame-search">
                    <FormGroup controlId="searchTagsInput" bsSize="small">
                        <ControlLabel>Tags</ControlLabel>
                        <ReactTags
                            allowNew={true}
                            autofocus={false}
                            placeholder='Add new/existing tag'
                            tags={this.state.searchTagsInput}
                            suggestions={this.state.tagSuggestions}
                            handleDelete={this.handleDelete.bind(this)}
                            handleAddition={this.handleAddition.bind(this)} />
                    </FormGroup>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                bsSize="large"
                                className="submit_btn"
                                onClick={(e) => this.searchTags(e)} >Search</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div >)
            }
        }
    }

    updateSearch() {
        if (this.state.searchType == "Age") {
            this.searchAge()
        } else if (this.state.searchType == "Fame") {
            this.searchFame()
        } else if (this.state.searchType == "Location") {
            this.searchLocation()
        } else if (this.state.searchType == "Tags") {
            this.searchTags()
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
                <div className="searchType">
                    {this.state.searchType ? this.renderSearchType() : null}
                </div>
                <div className="searchResults">
                    {this.state.showResults ? <div className="results">
                        {this.state.searchResults ? <UserList
                            matches={this.state.searchResults}
                            socket={this.props.socket}
                            getMatches={this.props.updateSearch} /> : <ControlLabel> No results were found.</ControlLabel>}
                    </div> : null}
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