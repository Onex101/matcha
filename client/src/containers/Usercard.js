import React, { Component } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Usercard.css";

var user = {
    basicInfo: {
      name: "Jane Doe",
      gender: "Female",
      birthday: "April 3, 1990",
      location: "Los Angeles, CA",
      photo: "http://lorempixel.com/500/500/people",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi."
    }
  }


export default class Usercard extends Component {
    constructor(props) {
        super(props);

    // var user = {
    //     basicInfo: {
    //       name: "Jane Doe",
    //       gender: "Female",
    //       birthday: "April 3, 1990",
    //       location: "Los Angeles, CA",
    //       photo: "http://lorempixel.com/500/500/people",
    //       bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi."
    //     }
    //   }
    }
    avatar(image, width, height) {
        var image = image,
            style = {
              width: width || 50,
              height: height || 50
            }; 
        
        if (!image) return null;
        
        return (
         <div className="avatar" style={style}>
               <img src={image} /> 
          </div>
        );
    }

    mainPanel(info) {
        if (!info) return null;
        var width=100
        var height=100
        return (
         <div>
            <div className="top">
                {this.avatar(info.photo, width, height)}
                {/* <h2>{info.name}</h2> */}
                <div className="username">{this.props.props.user_name}</div>
                {/* <h3>{info.location}</h3> */}
              <hr />
                {/* <p>{info.gender} | {info.birthday}</p> */}
                {/* <p>{info.gender} | {info.birthday}</p> */}
            </div>
            
            <div className="bottom">
              <h4>Biography</h4>
              <p>{this.props.props.bio}</p>
            </div>
          </div>
        );
      }

    render() {
        console.log("INFO 2:");
        console.info(this.props.props)
        return (
          <div id="user-profile">
        {/* {console.log("INFO 2:")} */}
            {this.mainPanel(user.basicInfo)}
          </div>
        )
      }
}