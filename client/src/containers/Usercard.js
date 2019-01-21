import React, { Component } from "react";
import "./Usercard.css";
import heart from './imgs/heart.png';
import x from './imgs/x.png';
import Modal from 'react-responsive-modal';
import Profile from "../containers/Profile";

export default class Usercard extends Component {
    constructor(props) {
        super(props);

      this.state = {
        open: false,
      }
    }

    
  onOpenModal = () => {
    this.setState({ open: true });
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

    bio(info){
      if (info.bio !== "null") {
      return (<div className="bottom">
                  {info.bio}
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
        <div className="username"><br/><h1 onClick={this.onOpenModal}>{info.user_name}</h1></div>
                  <div>
                    {/* <button onClick={this.onOpenModal}>Open modal</button> */}
                    <Modal open={open} onClose={this.onCloseModal} center>
                      {/* <h2>Simple centered modal</h2> */}
                      <Profile props={info} />
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
        // console.info(this.props.props)
        return (
          <div id="user-profile">
        {/* {console.log("INFO 2:")} */}
            {this.mainPanel(this.props.props)}
          </div>
        )
      }
}