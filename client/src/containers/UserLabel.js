import React, { Component } from "react";
import "./Matches.css";
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";

export default class Matches extends Component {
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
        var avatarImage = image,
            style = {
              width: width || 50,
              height: height || 50
            }; 
        if (!avatarImage) return null;
        return (<img className="avatar" style={style} src={avatarImage} alt =""/>);
    }

    renderUsername(user) {
        const { open } = this.state;
        return (<div className="userNameLabel">
            {user.user_name ? <div className="username"><p onClick={this.onOpenModal}>{user.user_name}</p></div>
                            : <div className="username"><p onClick={this.onOpenModal}>{user.data.user_name}</p></div>}
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    {user.data ? <ControlledTabs userInfo={user.data} /> :<ControlledTabs userInfo={user} />}
                </Modal>
            </div></div>
        )
    }

    render() {    
        const user = this.props.user
        if (user && user.pic && (user.user_name || (user.data && user.data.user_name))) {
            return (<div className="userLabel">
                    {this.avatar(user.pic, 60, 60)}
                    {this.renderUsername(user)}
                </div>
            )
        }
      }
}