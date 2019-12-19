import React, { Component } from "react";
import "./Likes.css";
import {ControlLabel } from "react-bootstrap";
import temp from './imgs/profile-placeholder.png';
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";
import UserLabel from "./UserLabel";

export default class Likes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo:   null,
            likes:      null,
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

    // Gets user images
    getUserProfile(){
        //For if wwe no longer return the profile pic on user Info
    }

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

    componentDidMount() {      
        if (this.state.userInfo === null && this.props.userInfo && this.props.userInfo.id  ){
            this.setState({userInfo: this.props.userInfo,})
        }
        // temporary fixs
        // if (this.state.likes === null && this.props.userMatches !== null)
        //     this.setState({likes: this.props.userMatches})
        if (this.state.likes === null && this.state.userInfo && this.state.userInfo.id) {
            try {
                fetch('/user/' + this.state.userInfo.id + '/getliked', {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json; charset=utf-8",
                  },
                })
                .then(response => response.json())
                .then((responseJSON) => {
                    console.log(responseJSON)
                    this.setState({likes: responseJSON})
                })
                .catch(err => console.error(err))
            } catch (e) {
              alert(e.message);
            }
        }
    }

    componentDidUpdate() {
        if (this.state.userInfo === null && this.props.userInfo && this.props.userInfo.id  ){
            this.setState({userInfo: this.props.userInfo,})
        }
        // temporary fixs
        // if (this.state.likes === null && this.props.userMatches !== null)
        //     this.setState({likes: this.props.userMatches})
        if (this.state.likes === null && this.state.userInfo && this.state.userInfo.id) {
            try {
                fetch('/user/' + this.state.userInfo.id + '/getliked', {
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
        }
    }

    renderUsername(user) {
        const { open } = this.state;
        return (<div>
            <div className="username"><p onClick={this.onOpenModal}>{user.data.user_name}</p></div>
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ControlledTabs userInfo={user.data} />
                </Modal>
            </div></div>
        )
    }
    renderLikes(likes) {
        var likedUsers = []
        for (var elem = 0; elem < likes.length; elem++) {
            if (likes[elem] && likes[elem].pic && likes[elem].user_name) {
                likedUsers.push(
                   <UserLabel user={likes[elem]} 
                   socket={this.props.socket}
                   key={elem} />
                )
            }
        }
        return likedUsers;
    }

    render() {
        const likes = this.state.likes;
        return (this.state.likes && this.state.userInfo ?
          <div id="likes">
            <div className="list">{this.renderLikes(likes)}</div>
          </div>
          : <ControlLabel> Loading ... </ControlLabel>
        )
      }
}