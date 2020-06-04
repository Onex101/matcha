import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button } from "react-bootstrap";
import "./UserList.css";
import Usercard from "../containers/Usercard";
import {ControlLabel } from "react-bootstrap";

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches:    null,
			order:      false,
		}
	}

	componentDidMount() {
		if (this.props.matches != null && this.state.matches == null) {
			this.setState({matches: this.props.matches})
		}
	}

	componentDidUpdate() {
		if (this.props.matches !== null && (this.state.matches == null || Object.keys(this.state.matches).length !== Object.keys(this.props.matches).length)) {
			this.setState({matches: this.props.matches})
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

	render() { 
		return (
			<div>
				{this.state.matches ? <div>{this.buttonsRender()}{this.getUserCards()}</div>
				: <div className="Home"><ControlLabel> Loading ... </ControlLabel></div>
				}
			</div>
		);
	}
}
 
export default UserList;