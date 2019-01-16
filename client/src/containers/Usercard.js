import React, { Component } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Usercard.css";
import heart from './imgs/heart.png';
import x from './imgs/x.png';

export default class Usercard extends Component {
    constructor(props) {
        super(props);
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
               <img src={this.props.props.pic} /> 
          </div>
        );
    }

    like(e){
      e.preventDefault();
      console.log("Yay")
    }

    dislike(e){
      e.preventDefault();
      console.log("Nay")
    }

    openProfile(e){
      e.preventDefault();
      console.log("Okay")
    }

    mainPanel(info) {
        if (!info) return null;
        var width=100
        var height=100
        return (
         <div>
            <div className="top">
                {this.avatar(info.pic, width, height)}
        <div className="username"><br/><h1 onClick={(e) => this.openProfile(e)}>{info.user_name}</h1></div>
              <hr />
            </div>
            
            <div className="bottom">
              {/* <h4>Biography</h4> */}
              {this.props.props.bio}
            </div>
            <div className="choices">
            <img src={x} alt="Dislike" className="dislike" onClick={(e) => this.dislike(e)}/>
            <img src={heart} alt="Like" className="like" onClick={(e) => this.like(e)} />
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
            {this.mainPanel(this.props.props)}
          </div>
        )
      }
}