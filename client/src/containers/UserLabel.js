import React, { Component } from "react";
import "./Matches.css";
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";
import {NOTIFICATION} from "../Events";

export default class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:       false,
            infoID:     null
        }
    }

    onOpenModal = (viewee_id) => {
        this.setState({ open: true });
        //Add to the visits
    //Add to the visits
		try {
			fetch('/user/visit/'+ localStorage.getItem('id') +'/' + viewee_id , {
				method: "GET",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				})
				.then(response => response.json())
				.then((responseJSON) => {
					this.setState({likes: responseJSON})
				})
				.catch(err => console.error(err))
			} catch (e) {
			alert(e.message);
			}
		//Send Notification
		const socket = this.props.socket;
		const message = localStorage.getItem('user') + ' visited your profile';
		socket.emit(NOTIFICATION, message, this.props.user);
		try {
			fetch('/notification/send', {
				method: "POST",
				headers: {
				"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
					id: this.props.user.id,
					message: message,
				})
			})
			.then(response => response.json())
			.then((responseJSON) => {
				console.log(responseJSON)
			})
			.catch(err => console.error(err))
		} catch (e) {
			alert(e.message);
		}
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
     
    onCloseModal = () => {
		this.setState({ open: false });
    }

    componentDidUpdate() {
        console.log("PROPS USERINFO: " + this.props.user);
        console.info(this.props.user);
        console.log("STATE INFOID: " + this.state.infoID);
        if (this.props.user != null && this.state.infoID == null) {
            this.setState({infoID: this.props.user.id}) 
        }
    }

    renderUsername(user) {
        const { open, infoID } = this.state;
        console.log({infoID});
        if (this.state.infoID != null) {
            return (<div className="userNameLabel">
                {user.user_name ? <div className="username"><p onClick={(e) => this.onOpenModal(this.state.infoID)}>{user.user_name}</p></div>
                                : <div className="username"><p onClick={(e) => this.onOpenModal(this.state.infoID)}>{user.data.user_name}</p></div>}
                <div>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        {user.data ? <ControlledTabs 
                                        userInfo={user.data}
                                        socket={this.props.socket} 
                                        closeModal={this.onCloseModal}
                                        showLike={false}
                                        />
                                : <ControlledTabs 
                                        userInfo={user} 
                                        socket={this.props.socket} 
                                        closeModal={this.onCloseModal}
                                        showLike={false}
                                        />}
                    </Modal>
                </div></div>
            )
        } else { return null}
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