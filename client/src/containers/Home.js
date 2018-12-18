import React, { Component } from "react";
import "./Home.css";

// Renders the homepafe given that the user is not currently signed in
export default class Home extends Component {

  landerCheck() {
    if (this.props.userMatches !== null) {
      var ret = '<div>';
      for (var elem in this.props.userMatches) {
        console.log("elem = " + JSON.stringify(this.props.userMatches[elem].data.user_name));
        ret += '<div>' + this.props.userMatches[elem].data.user_name + '</div>'
      };
      ret += '</div>';
      return ret;
    } 
    else {
      var ret = '<div><h1>Matcha</h1><p>Find your Match and let Sparks fly!</p></div>';
      return ret;
    }
  }


  render() {
    return (
      <div className="Home">
        <div className="lander">
          <div dangerouslySetInnerHTML={{__html: this.landerCheck()}}></div>
        </div>
      </div>
    );
  }
}
