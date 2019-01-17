import React, { Component } from "react";
import "./Profile.css";
import heart from './imgs/heart.png';
import x from './imgs/x.png';
import Modal from 'react-responsive-modal';
import {ControlLabel } from "react-bootstrap";

export default class Profile extends Component {
    constructor(props) {
        super(props);

      this.state = {
      }
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

    render() {
        // console.log("INFO 2:");
        // console.info(this.props.props)
        const info = this.props.props;
        console.log("INFO: " +JSON.stringify(info))
        var width=150
        var height=150
        return (this.props.props.id ?
          <div id="profile">
            <div className="top">
                <div>
                    {this.avatar(info.pic, width, height)}
                    <br />
                    <div className="pics">
                        {this.avatar(info.pic, 60, 60)}
                        {this.avatar(info.pic, 60, 60)}
                        {this.avatar(info.pic, 60, 60)}
                        {this.avatar(info.pic, 60, 60)}
                    </div>
                </div>
                <div className="username"><br/><h1 onClick={this.onOpenModal}>{info.user_name}</h1></div>
                <hr />
            </div>
            <br/>
            
            <div className="bottom">
                {info.bio}
            </div>
            <div className="choices">
            {/* <img src={x} alt="Dislike" className="dislike" onClick={(e) => this.dislike(e)}/>
            <img src={heart} alt="Like" className="like" onClick={(e) => this.like(e)} /> */}
            </div>
            {/* {this.mainPanel(this.props.props)} */}
          </div>
          : <ControlLabel> Loading ... </ControlLabel>
        )
      }
}