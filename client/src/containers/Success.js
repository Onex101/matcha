import React, { Component } from "react";
import "./Success.css";

export default class Success extends Component {
  render() {
    return (
      <div>
        <div className="Success">
          <div className="lander">
            <h1>Successfully Registered!</h1>
            <p>Now head to the login page and let the magic happen!</p>
          </div>
        </div>
      </div>
    )
  }
}