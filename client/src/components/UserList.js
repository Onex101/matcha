import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel  } from "react-bootstrap";
import Dropdown from 'react-dropdown'
import "./UserList.css";
import Usercard from "../containers/Usercard";
const ReactTags = require('react-tag-autocomplete')

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches:    null,
			order:      false,
			propsLength: null,

			filterType: null,
			filterAgeInput: "0",
			filterFameInput: "0",
			filterLocationInput: null,
			filterTagsInput: [],
			filterResults: null,
			showResults: false,
			tagSuggestions: null,
			locationCoordinates: null,
			locationSuggestions: null
		}
	}

	componentDidMount() {
		if (this.props.matches !== null && this.state.matches == null) {
			this.setState({matches: this.props.matches})
			this.setState({propsLength: this.props.matches.length})
		}
		if (this.state.tagSuggestions === null) {
			this.getInterests()
		}
		if (this.state.locationCoordinates === null) {
			this.getLocationCoordinates()
		}
	}

	componentDidUpdate() {
		if (this.props.matches !== null && (this.state.matches == null || this.state.propsLength !== Object.keys(this.props.matches).length)) {
		// if (this.props.matches !== null && this.state.matches == null) {
			this.setState({matches: this.props.matches})
			this.setState({propsLength: Object.keys(this.props.matches).length})
		}

		if (this.state.tagSuggestions === null) {
			this.getInterests()
		}

		if (this.state.locationCoordinates !== null &&
			this.state.locationCoordinates.length > 0 && this.state.locationSuggestions === null) {
			this.getLocationSuggestions()
		}
	}

	sortNewList () {
		if (this.state.order == "age")
			this.ageSort();
		else if (this.state.order == "location")
			this.locationSort();
		else if (this.state.order == "tags")
			this.tagsSort();
		else if (this.state.order == "fame")
			this.fameSort();
	}

	resetSort = (e) => {
		e.preventDefault()
		try {
		  this.setState({order: false})
		  this.setState({matches: this.props.userMatches})
		} catch (e) {
		  alert(e.message);
		}
	}

	sort_by(field, reverse, primer) {
		var key = primer ? 
			function(x) {return primer(x[field])} : 
			function(x) {return x[field]};
		reverse = !reverse ? 1 : -1;
		return function (a, b) {
			return (a = key(a), b = key(b), reverse * ((a > b) - (b > a)));
		} 
	}
   
	sortByAge = (e) => {
		e.preventDefault()
		try {
			var ageSort = this.state.matches;
			if (ageSort) {
				var result = [];
				for(var i in ageSort){
					var keys = Object.keys(ageSort[i]);
					var values = Object.values(ageSort[i]);
					var temp = [];
					for(var j in keys){
						temp[keys[j]] = values[j];
					}
					result.push(temp);
				}
				result.sort(this.sort_by('birth_date_diff', false, false));
				this.setState({order: "age"})
				this.setState({matches: result});
			}
		} catch (e) {
			alert(e.message);
		}
	}

	sortByLocation = (e) => {
		e.preventDefault()
		try {
			// Make obj into array to sort
			var gpsSort = this.state.matches;
			if (gpsSort) {
			var result = [];
			for(var i in gpsSort){
				var keys = Object.keys(gpsSort[i]);
				var values = Object.values(gpsSort[i]);
				var temp = [];
				for(var j in keys){
					temp[keys[j]] = values[j];
				}
				result.push(temp);
			}
			result.sort(this.sort_by('dist_raw', false, false));
			this.setState({order: true})
			this.setState({matches: result});
			}
		}  catch (e) {
			alert(e.message);
		}
	}

	sortByTags = (e) => {
		e.preventDefault()
		try {
			// Make obj into array to sort
			var gpsSort = this.state.matches;
			if (gpsSort) {
			var result = [];
			for(var i in gpsSort){
				var keys = Object.keys(gpsSort[i]);
				var values = Object.values(gpsSort[i]);
				var temp = [];
				for(var j in keys){
					temp[keys[j]] = values[j];
				}
				result.push(temp);
			}
			result.sort(this.sort_by('tagMatch', true, false));
			this.setState({order: "tags"})
			this.setState({matches: result});
			}
		}  catch (e) {
			alert(e.message);
		}
	}

	sortByFame = (e) => {
		e.preventDefault()
		try {
			// Make obj into array to sort
			var fameSort = this.state.matches;
			if (fameSort) {
			var result = [];
			for(var i in fameSort){
				var keys = Object.keys(fameSort[i]);
				var values = Object.values(fameSort[i]);
				var temp = [];
				for(var j in keys){
					temp[keys[j]] = values[j];
				}
				result.push(temp);
			}
			//TODO: change this to Fame search
			result.sort(this.sort_fame_by(false, true));
			this.setState({order: "fame"})
			this.setState({matches: result});
			}
		}  catch (e) {
			alert(e.message);
		}
	}
	
	sort_fame_by(field, reverse, primer) {
		var key = primer ? 
			function(x) {return primer(x["data"]["fame"])} : 
			function(x) {return x["data"]["fame"]};
		reverse = !reverse ? 1 : -1;
		return function (a, b) {
			return (a = key(a), b = key(b), reverse * ((a > b) - (b > a)));
		} 
	}

	buttonsRender() {
		return (
			<div className='button-fix'>
				  <ButtonToolbar className='buttons'>
					<ButtonGroup>
						<Button bsSize="large" onClick={this.sortByAge}>Age</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button bsSize="large" onClick={this.sortByLocation}>Location</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button bsSize="large" onClick={this.sortByFame}>Fame</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button bsSize="large" onClick={this.sortByTags}>Tags</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button bsSize="large" onClick={this.resetSort}>Reset</Button>
					</ButtonGroup>
				  </ButtonToolbar>
			</div>
		)
	}

	getUserCards() {
		if (this.state.matches !== null) {
		  var rows = [];
		//   console.log("MATCHES")
		//   console.info(this.state.matches)
		  for (var elem in this.state.matches) {
			  rows.push(<Usercard  
						userInfo = {this.state.matches[elem].data}
						key={elem}
						pic = {this.state.matches[elem].data.pic} 
						socket = {this.props.socket}
						getMatches = {this.props.getMatches}
					  />);
		  }
		  return <div>{rows}</div>;
		}
	}

	// ////Filtering stuff

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
	
	handleFilterChange = event => {
		this.setState({
			filterType: event.value
		});
	}

	handleLocationFilterChange = event => {
		this.setState({
			filterLocationInput: event.value
		});
	}

	// Handle Delete of Tag
	handleDelete(i) {
		const tagDelete = this.state.filterTagsInput[i]
		// console.log("Deleting tags: ")
		// console.info(tagDelete)
		const tags = this.state.filterTagsInput.slice(0)
		tags.splice(i, 1)
		this.setState({ filterTagsInput: tags })
	}

	// Handle Addition of Tag to user profile    
	handleAddition(tag) {
		const tags = this.state.filterTagsInput;
		tag.name = tag.name.toLowerCase();
		if (tags.length < 10) {
			tags.push({ id: tag.id, name: tag.name })
			this.setState({ filterTagsInput: tags })
		}
	}

	isInt(value) {
		return !isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10));
	}

	calculateAge(birth_date) { // birthday is a date
		var birthday = new Date(birth_date);
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	filterAge = async event => {
		event.preventDefault();
		if (this.isInt(this.state.filterAgeInput) && this.props.userInfo.id) {			
			try {
				var matchArr = this.state.matches;
				this.setState({matches: null});
				
				if (matchArr) {
					var result = [];
					for(var i in matchArr){
						console.info(matchArr[i])
						console.log("comparing: " + this.calculateAge(matchArr[i].data.birth_date) + " and " + this.state.filterAgeInput)
						if (this.calculateAge(matchArr[i].data.birth_date).toString() === this.state.filterAgeInput) {
							result.push(matchArr[i]);
						}
					}
					console.log("Results: ")
					console.info(result)
					this.setState({matches: result});
				}
			} catch (e) {
				alert(e.message);
			}
		} else {
			alert("Please insert a number.");
		}
	}

	filterFame = async event => {
		event.preventDefault();
		// console.log(this.state.filterFameInput)
		if (this.isInt(this.state.filterFameInput) && this.props.userInfo.id) {
			// TODO Not returning valid results
			try {
				var matchArr = this.state.matches;
				this.setState({matches: null});
				
				if (matchArr) {
					var result = [];
					for(var i in matchArr){
						console.info(matchArr[i])
						console.log("comparing: " + matchArr[i].data.fame + " and " + this.state.filterFameInput)
						if (matchArr[i].data.fame == this.state.filterFameInput || matchArr[i].data.fame === null) {
							result.push(matchArr[i]);
						}
					}
					console.log("Results: ")
					console.info(result)
					this.setState({matches: result});
				}
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
			// console.log(this.state.locationSuggestions[i].location + "(" + this.state.locationSuggestions[i].gps_lat + ";" + this.state.locationSuggestions[i].gps_lon + ")" + " ? " +  this.state.filterLocationInput)
			if (this.state.locationSuggestions[i].location === this.state.filterLocationInput) {
				// console.log("Found the match!")
				return (this.state.locationSuggestions[i])
			}
		}
		return null;
	}

	filterLocation = async event => {
		event.preventDefault();
		if (this.state.filterLocationInput !== null && this.state.locationSuggestions !== null) {
			var location = this.getLocationDetails();
			// console.log("TESTER")
			// console.log(location.gps_lat)
			// console.log(location.gps_lon)
			try {
				fetch('/locationfilter/' + this.props.userInfo.id + '/' + location.gps_lat + '/' + location.gps_lon, {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						// console.log("Location filter response: ", responseJSON)
						this.setState({ showResults: true, filterResults: responseJSON })
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert(e.message);
			}
		}
	}

	filterTags = async event => {
		event.preventDefault();
		// console.log(this.state.filterTagsInput)
		if (this.state.filterTagsInput.length > 0 && this.props.userInfo.id) {

			

			// TODO Not returning valid results

			try {
				fetch('/tagfilter', {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						user_id: this.props.userInfo.id,
						interests: this.state.filterTagsInput
					})
				})
					.then(response => response.json())
					.then((responseJSON) => {
						console.log("TAGS filter response: ", responseJSON)
						// this.setState({ showResults: true, filterResults: responseJSON })
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert(e.message);
			}
		} else {
			alert("Please insert at least one tag.");
		}
	}

	renderFilterType() {
		if (this.state.filterType == "Age") {
			return (<div id="age-filter">
				<FormGroup controlId="filterAgeInput" bsSize="small">
					<ControlLabel>Max Age Gap</ControlLabel>
					<FormControl
						componentClass="textarea"
						defaultValue={this.state.filterAgeInput}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<ButtonToolbar>
					<ButtonGroup>
						<Button
							bsSize="large"
							className="submit_btn"
							onClick={(e) => this.filterAge(e)} >Filter</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</div >)
		} else if (this.state.filterType == "Fame") {
			return (<div id="fame-filter">
				<FormGroup controlId="filterFameInput" bsSize="small">
					<ControlLabel>Fame</ControlLabel>
					<FormControl
						componentClass="textarea"
						defaultValue={this.state.filterFameInput}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<ButtonToolbar>
					<ButtonGroup>
						<Button
							bsSize="large"
							className="submit_btn"
							onClick={(e) => this.filterFame(e)} >Filter</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</div >)
		} else if (this.state.filterType == "Location") {
			if (!this.isEmpty(this.state.locationSuggestions)) {
				var locations = []
				for (var place in this.state.locationSuggestions) {
					locations.push(this.state.locationSuggestions[place].location)
				}
				return (<div id="location-filter"><ControlLabel>Location</ControlLabel>
					{!this.isEmpty(locations) ?
						<Dropdown
							options={locations}
							onChange={this.handleLocationFilterChange}
							value={this.state.filterLocationInput}
							placeholder="Select an option"
							ControlLabel="filterLocationInput" />
						: <Dropdown options={null}
							onChange={this.handleLocationFilterChange}
							value={this.state.filterLocationInput}
							placeholder="No Location Available"
							ControlLabel="filterLocationInput" />
					}
					<ButtonToolbar>
						<ButtonGroup>
							<Button
								bsSize="large"
								className="submit_btn"
								onClick={(e) => this.filterLocation(e)} >Filter</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
				)
			} else {
				return (<ControlLabel> Loading ... </ControlLabel>)
			}
		} else if (this.state.filterType == "Tags") {
			// return (<div>filter by tags</div>)
			if (this.state.filterTagsInput && this.state.filterTagsInput.constructor === Array && this.state.tagSuggestions) {
				return (<div id="fame-filter">
					<FormGroup controlId="filterTagsInput" bsSize="small">
						<ControlLabel>Tags</ControlLabel>
						<ReactTags
							allowNew={true}
							autofocus={false}
							placeholder='Add new/existing tag'
							tags={this.state.filterTagsInput}
							suggestions={this.state.tagSuggestions}
							handleDelete={this.handleDelete.bind(this)}
							handleAddition={this.handleAddition.bind(this)} />
					</FormGroup>
					<ButtonToolbar>
						<ButtonGroup>
							<Button
								bsSize="large"
								className="submit_btn"
								onClick={(e) => this.filterTags(e)} >Filter</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div >)
			}
		}
	}

	updateFilter() {
		if (this.state.filterType == "Age") {
			this.filterAge()
		} else if (this.state.filterType == "Fame") {
			this.filterFame()
		} else if (this.state.filterType == "Location") {
			this.filterLocation()
		} else if (this.state.filterType == "Tags") {
			this.filterTags()
		}
	}
	//

	filterRender() {
		const options = [
			'Age', 'Fame', 'Location', 'Tags'
		]
		return (
			<div className="filter">
				<div className="filterParameters">
					<ControlLabel>Filter by</ControlLabel>
					<Dropdown options={options} 
								onChange={this.handleFilterChange} 
								value={this.state.filterType} 
								placeholder="Select an option" 
								ControlLabel="filterType" />
				</div>
				<div className="filterType">
					{this.state.filterType ? this.renderFilterType() : null}
				</div>
			</div>
		);
	}

	render() { 
		return (
			<div>
				{this.state.matches ? <div>
					{this.buttonsRender()}
					{this.filterRender()}
					{this.getUserCards()}
				</div>
				: <div className="Home"><ControlLabel> Loading ... </ControlLabel></div>
				}
			</div>
		);
	}
}
 
export default UserList;