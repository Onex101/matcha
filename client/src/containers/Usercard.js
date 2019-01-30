import React, { Component } from "react";
import "./Usercard.css";
import heart from './imgs/heart.png';
import x from './imgs/x.png';
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";
import { Socket } from "net";
import {NOTIFICATION} from "../Events";

export default class Usercard extends Component {
    constructor(props) {
        super(props);

      this.state = {
        open: false,
      }
    }

    
  onOpenModal = () => {
    this.setState({ open: true });
    //Add to the visits

    // this.props.userInfo.id
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

    avatar(image, width, height) {
        var image = image,
            style = {
              width: width || 50,
              height: height || 50
            }; 
        if (!image) return null;
        return (<img className="avatar" style={style} src={image} /> );
    }

    like(e){
      console.log(this.props)
      const socket = this.props.socket;
      socket.emit(NOTIFICATION, 'Some one has liked you', this.props.userInfo.user_name);
      e.preventDefault();
      try {
        fetch('/like/' + localStorage.getItem('id') + '/' + this.props.userInfo.id, {
          method: "GET",
          headers: {
          "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then(response => response.json())
        .then((responseJSON) => {
          console.log(responseJSON)
          this.props.getMatches();

        })
        .catch(err => console.error(err))
        } catch (e) {
          alert(e.message);
        }
      console.log("Yay")
      // this.props.getMatches();
    }

    dislike(e){
      e.preventDefault();
      try {
        fetch('/dislike/' + localStorage.getItem('id') + '/' + this.props.userInfo.id, {
          method: "GET",
          headers: {
          "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then(response => response.json())
        .then((responseJSON) => {
          console.log(responseJSON)
          this.props.getMatches();
        })
        .catch(err => console.error(err))
        } catch (e) {
          alert(e.message);
        }
      console.log("Nay")
    }

    openProfile(e){
      e.preventDefault();
      console.log("Okay")
    }

    bio(info){
      if (info.userInfo.bio !== "null") {
      return (<div className="bottom">
                  {info.userInfo.bio}
                </div>) 
      }
    }

    mainPanel(info) {
      if (!info) return null;
      var width=100
      var height=100
      const { open } = this.state;
      return (
         <div>
            <div className="top">
                {this.avatar(info.pic, width, height)}
            <div className="username"><br/><h1 onClick={this.onOpenModal}>{info.userInfo.user_name}</h1></div>
                  <div>
                    <Modal open={open} onClose={this.onCloseModal} center>
                      <ControlledTabs userInfo={info.userInfo} />
                    </Modal>
                  </div>
              <hr />
            </div>
            {this.bio(info)}
            <div className="choices">
            <img src={x} alt="Dislike" className="dislike" onClick={(e) => this.dislike(e)}/>
            <img src={heart} alt="Like" className="like" onClick={(e) => this.like(e)} />
            </div>
          </div>
        );
    }

    render() {
        // console.log("INFO 2:");
        // console.info(this.props)
        return (
          <div id="user-profile">
            {this.mainPanel(this.props)}
          </div>
        )
      }
}