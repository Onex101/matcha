import React, { Component } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Usercard.css";

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
        var img_src = this.props.props.pic + '/' + ( this.props.props.id % 7)
        return (
         <div className="avatar" style={style}>
               {/* <img src={this.props.props.pic} />  */}
               <img src={img_src} /> 
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
                {this.avatar(info.pic, width, height)}
                {/* <h2>{info.name}</h2> */}
                <div className="username"><br/>{info.user_name}</div>
                {/* <h3>{info.location}</h3> */}
              <hr />
                {/* <p>{info.gender} | {info.birthday}</p> */}
                {/* <p>{info.gender} | {info.birthday}</p> */}
            </div>
            
            <div className="bottom">
              {/* <h4>Biography</h4> */}
              {this.props.props.bio}
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