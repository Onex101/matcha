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

  resetSort = (e) => {
    e.preventDefault()

    try {
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
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    } 
  }

  sortByAge = (e) => {
    e.preventDefault()
    
    try {
      var ageSort = this.state.matches;
      // console.log("AGE SORT:")
      // console.info(ageSort)
      if (ageSort) {
        var result = [];
        for(var i in ageSort){
            var keys = Object.keys(ageSort[i]);
            var values = Object.values(ageSort[i]);
            var temp = [];
            for(var i in keys){
              temp[keys[i]] = values[i];
            }
            result.push(temp);
        }
        // console.log("AGE RESULT:")
        // console.info(result)
       result.sort(this.sort_by('birth_date_diff', false, false));
        // console.log("AGESORT FINAL = ");
        // console.info(result)
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
    if (localStorage.getItem('user')) {
      if (this.props.userInfo && this.props.userInfo.id && this.state.matches !== null) {
        if (this.props.userInfo && this.props.userInfo.profile_pic_id) {
          return (<div>
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
              <ButtonGroup>
                  <Button
                      bsSize="large"
                      onClick={this.resetSort}
                  >Reset</Button>
              </ButtonGroup>
              </ButtonToolbar>
            </div>
            {this.getMatchCards()}
            </div>
          )
        }
        else {
          return (<div><h1>Hey stranger!</h1><p>Head over to your profile to add a profile picture so other users can see you!</p></div>)
        }
      }
      else {
          return <div className="Home"><ControlLabel> Loading ... </ControlLabel></div>;
      }
    }
  }

  getMatches() {
    if (this.props.userMatches !== null) {
      this.setState({matches: this.props.userMatches});
    }
  }

  render() {
    return(<div className="Home">
              <div className="lander">
                {localStorage.getItem('user')
                  ?  this.landerCheck()
                  : <div><h1>Matcha</h1><p>Find your Match and let Sparks fly!</p></div>}
                  </div>
               </div>)
  }
}
