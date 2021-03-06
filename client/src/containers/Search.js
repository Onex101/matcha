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
			locationCoordinates: null,
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

	async getLocationSuggestions() {
		if (this.state.locationCoordinates && this.state.locationCoordinates.constructor === Array &&
			this.state.locationCoordinates.length > 0) {
			var locations = [];
			for (var elem in this.state.locationCoordinates) {
				var lat = this.state.locationCoordinates[elem].gps_lat;
				var long = this.state.locationCoordinates[elem].gps_lon;
				const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + "AIzaSyDKEXlzFbGtbXxHkUy6GSdFCofq5BI_oVo");
				const responseJson = await response.json();
				// console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
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
				if (location !== null) {
					locations.push({ location: location, gps_lat: lat, gps_lon: long });
				}
			}
			var cleanLocations = this.removeDuplicates(locations, 'location');
			this.setState({ locationSuggestions: cleanLocations })
		}
	}

	getLocationCoordinates() {
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
					// console.info(responseJSON)
					var coordinates = []
					for (var gps in responseJSON) {
						// console.log(responseJSON[gps])
						coordinates.push(responseJSON[gps])
					}
					this.setState({ locationCoordinates: coordinates })
				})
				.catch(err => console.error(err))
		} catch (e) {
			alert(e.message);
		}
	}

	removeDuplicates(originalArray, prop) {
		var newArray = [];
		var lookupObject = {};

		for (var i in originalArray) {
			lookupObject[originalArray[i][prop]] = originalArray[i];
		}

		for (i in lookupObject) {
			newArray.push(lookupObject[i]);
		}
		return newArray;
	}

	// Stops the auto focus on the tags
	componentDidMount() {
		if (this.state.tagSuggestions === null) {
			this.getInterests()
		}
		if (this.state.locationCoordinates === null) {
			this.getLocationCoordinates()
		}
	}

	isEmpty(obj) {
		if (obj == null) {
			return true;
		}
		if (obj === undefined) {
			return true;
		}
		if (obj.length === 0) {
			return true;
		}
		if (obj.length > 0) {
			return false;
		}
		return true;
	}

	componentDidUpdate() {
		if (this.state.tagSuggestions === null) {
			this.getInterests()
		}

		if (this.state.locationCoordinates !== null &&
			this.state.locationCoordinates.length > 0 && this.state.locationSuggestions === null) {
			this.getLocationSuggestions()
		}

		//To remove
		// if (this.state.locationSuggestions !== null && !this.isEmpty(this.state.locationSuggestions)) {
		//     var cleanLocations = this.removeDuplicates(this.state.locationSuggestions, 'location');
		//     if (cleanLocations.length != this.state.locationSuggestions.length) {
		//         this.setState({ locationSuggestions: cleanLocations })
		//     }
		// }
	}

	handleSearchChange = event => {
		this.setState({
			searchType: event.value
		});
	}

	handleLocationSearchChange = event => {
		this.setState({
			searchLocationInput: event.value
		});
	}

	// Handle Delete of Tag
	handleDelete(i) {
		const tagDelete = this.state.searchTagsInput[i]
		// console.log("Deleting tags: ")
		// console.info(tagDelete)
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
		// console.log(this.state.searchAgeInput)
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
						// console.log("Age search response: ", responseJSON)
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
		// console.log(this.state.searchFameInput)
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
						// console.log("Fame search response: ", responseJSON)
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

	getLocationDetails() {
		// console.info(this.state.locationSuggestions)
		for (var i in this.state.locationSuggestions) {
			// console.log(this.state.locationSuggestions[i].location + "(" + this.state.locationSuggestions[i].gps_lat + ";" + this.state.locationSuggestions[i].gps_lon + ")" + " ? " +  this.state.searchLocationInput)
			if (this.state.locationSuggestions[i].location === this.state.searchLocationInput) {
				// console.log("Found the match!")
				return (this.state.locationSuggestions[i])
			}
		}
		return null;
	}

	searchLocation = async event => {
		event.preventDefault();
		if (this.state.searchLocationInput !== null && this.state.locationSuggestions !== null) {
			var location = this.getLocationDetails();
			// console.log("TESTER")
			// console.log(location.gps_lat)
			// console.log(location.gps_lon)
			try {
				fetch('/locationsearch/' + this.props.userInfo.id + '/' + location.gps_lat + '/' + location.gps_lon, {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						// console.log("Location search response: ", responseJSON)
						this.setState({ showResults: true, searchResults: responseJSON })
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert(e.message);
			}
		}
	}

	searchTags = async event => {
		event.preventDefault();
		// console.log(this.state.searchTagsInput)
		if (this.state.searchTagsInput.length > 0 && this.props.userInfo.id) {
			// TODO Not returning valid results

			try {
				fetch('/tagsearch', {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						user_id: this.props.userInfo.id,
						interests: this.state.searchTagsInput
					})
				})
					.then(response => response.json())
					.then((responseJSON) => {
						// console.log("TAGS search response: ", responseJSON)
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
			if (!this.isEmpty(this.state.locationSuggestions)) {
				var locations = []
				for (var place in this.state.locationSuggestions) {
					locations.push(this.state.locationSuggestions[place].location)
				}
				return (<div id="location-search"><ControlLabel>Location</ControlLabel>
					{!this.isEmpty(locations) ?
						<Dropdown
							options={locations}
							onChange={this.handleLocationSearchChange}
							value={this.state.searchLocationInput}
							placeholder="Select an option"
							ControlLabel="searchLocationInput" />
						: <Dropdown options={null}
							onChange={this.handleLocationSearchChange}
							value={this.state.searchLocationInput}
							placeholder="No Location Available"
							ControlLabel="searchLocationInput" />
					}
					<ButtonToolbar>
						<ButtonGroup>
							<Button
								bsSize="large"
								className="submit_btn"
								onClick={(e) => this.searchLocation(e)} >Search</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
				)
			} else {
				return (<ControlLabel> Loading ... </ControlLabel>)
			}
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
					{this.props.userInfo && this.props.userInfo.pic ? 
						this.state.showResults ? <div className="results">
							{this.state.searchResults ? <UserList
								matches={this.state.searchResults}
								socket={this.props.socket}
								userInfo={this.props.userInfo}
								getMatches={this.props.updateSearch} /> : <ControlLabel> No results were found.</ControlLabel>}
						</div> : null
					: <ControlLabel>You need a profile picture before you can see any results! Head over to your profile to fix that up!</ControlLabel>}
				</div>
			</div>
		)
	}
}