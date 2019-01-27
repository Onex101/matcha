import React, { Component } from "react";
import "./Likes.css";
import {ControlLabel } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";

export default class Likes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:       false,
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
        // console.log(image)
        var image = image,
            style = {
              width: width || 50,
              height: height || 50
            }; 
        if (!image) return null;
        return (<img className="avatar" style={style} src={image} />);
    }

    renderUsername(user) {
        const { open } = this.state;
        return (<div className="userNameLabel">
            <div className="username"><p onClick={this.onOpenModal}>{user.data.user_name}</p></div>
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ControlledTabs userInfo={user.data} />
                </Modal>
            </div></div>
        )
    }

    render() {    
        const user = this.props.user
        if (user && user.pic && user.data.user_name) {
            return (<div className="userLabel">
                    {this.avatar(user.pic, 60, 60)}
                    {this.renderUsername(user)}
                </div>
            )
        }
      }
}