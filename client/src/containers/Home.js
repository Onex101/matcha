import React, { Component } from "react";
import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Home.css";

// Renders the homepafe given that the user is not currently signed in
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        matches: null,
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

  getMatchCards() {
    if (this.props.userMatches !== null) {
      if (this.state.matches === null)
        this.getMatches()
      console.log("State = " + this.state.matches);
      var ret = '<div className="lander">';
      for (var elem in this.state.matches) {
        console.log("elem = " + JSON.stringify(this.state.matches[elem].data.user_name));
        ret += '<div>' + this.state.matches[elem].data.user_name + '</div>'
      };
      ret += '</div>';
      console.log("RET = " + ret);
      return ret;
    }
  }
  
  landerCheck() {
    if (localStorage.getItem('user') !== null) {
      if (this.props.userMatches !== null){
        if (this.state.matches === null)
          this.getMatches();
        return (
          <div>
          <ButtonToolbar><ButtonGroup>
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
  }

  getMatches() {
    if (this.props.userMatches !== null) {
      this.setState({matches: this.props.userMatches});
      console.log("State = " + this.state.matches);
  }
}

  render() {
    return (
      <div className="Home">
        <div className="lander">
          {this.state.matches === null
            ? <div dangerouslySetInnerHTML={{__html: this.landerCheck()}}></div>
           :<div>{this.landerCheck()}<div dangerouslySetInnerHTML={{__html: this.getMatchCards()}}></div></div>}
        </div>
      </div>
    );
  }
}
