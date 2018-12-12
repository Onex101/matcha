import React, { Component } from "react";
import "./Home.css";

// Renders the homepafe given that the user is not currently signed in
export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Matcha</h1>
          <p>Find your Match and let Sparks fly!</p>
        </div>
      </div>
    );
  }
}
