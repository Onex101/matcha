import React, { Component } from "react";
// import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ButtonGroup, ButtonToolbar, Button} from "react-bootstrap";
import "./Home.css";
import Usercard from "../containers/Usercard";
import {ControlLabel } from "react-bootstrap";

// Renders the homepage given that the user is not currently signed in
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: props.userMatches,
    }
  }

  sort_by(field, reverse, primer) {
    // console.log("Sort by test 1");
    var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};
    // console.log("Sort by test 2");

    reverse = !reverse ? 1 : -1;
    // console.log("Sort by test 3");

    return function (a, b) {
      // console.log("Sort by test 4");
      // console.log("a = " + key(a));
      // console.log("b = " + key(b));
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    } 
  }

  sortByAge = (e) => {
    e.preventDefault()
    
    try {
      var ageSort = this.state.matches;
      if (ageSort) {
        [].slice.call(ageSort).sort(this.sort_by('birth_date_diff', true, false));
        console.log("GPSSort = " + JSON.stringify(ageSort));
        this.setState({matches: ageSort});
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
            for(var i in keys){
              temp[keys[i]] = values[i];
            }
            result.push(temp);
        }
        // console.log("Result =");
        // console.info(result[0]);
        result.sort(this.sort_by('dist_raw', false, false));
        // console.log("GPSSort = ");
        // console.info(result);
        this.setState({matches: result});
      }
    }  catch (e) {
      alert(e.message);
    }
  }

  componentDidUpdate(){
    if (this.state.matches === null){
      this.getMatches();
    // console.log("State Matches 3 = " + JSON.stringify(this.state.matches));
    // console.log("Props Matches 3 = " + JSON.stringify(this.props.userMatches));
    }
  }

  getMatchCards() {
    if (this.state.matches !== null) {
      var rows = [];
      for (var elem in this.state.matches) {
        // console.log("match[" + elem + ']')
        // console.info(this.state.matches[elem].data)
          rows.push(<Usercard  userInfo = {this.state.matches[elem].data}
                key={elem}
                pic = {this.state.matches[elem].data.pic} />);
      }
      return <div>{rows}</div>;
    }
  }
  
  landerCheck() {
    if (localStorage.getItem('user') !== null && this.state.matches !== null) {
        return (
          <div className='button-fix'>
            <ButtonToolbar className='buttons'><ButtonGroup>
                <Button
                    bsSize="large"
                    onClick={this.sortByAge}
                >Age</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    bsSize="large"
                    onClick={this.sortByLocation}
                >Location</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    bsSize="large"
                    onClick={this.sortByFame}
                >Fame</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    bsSize="large"
                    onClick={this.sortByTags}
                >Tags</Button>
            </ButtonGroup>
            </ButtonToolbar>
          </div>
        )
    }
    else {
      var ret = '<div><h1>Matcha</h1><p>Find your Match and let Sparks fly!</p></div>';
      return ret;
    }
  }

  getMatches() {
    // console.log("State Matches: " + this.state.matches);
    // console.log("Props Matches: " + JSON.stringify(this.props.userMatches));
    if (this.props.userMatches !== null) {
      this.setState({matches: this.props.userMatches});
      // console.log("State = " + this.state.matches);
    }
  }

  render() {
    // if (this.state.matches === null)
    //   this.getMatches()
    return(localStorage.getItem('user') && this.state.matches 
            ?  <div className="Home">
            {/* {console.log("IN HOME MATHCES:")}
            {console.info(this.state.matches)} */}
                  <div className="lander">
                    {/* <div>{this.landerCheck()}<div dangerouslySetInnerHTML={{__html: this.getMatchCards()}}></div></div> */}
                    <div>{this.landerCheck()}{this.getMatchCards()}</div>
                  </div>
                </div>
		      	: <div className="Home">{this.getMatches()}<ControlLabel> Loading ... </ControlLabel></div>);
  }
}
