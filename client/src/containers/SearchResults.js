import React, { Component } from "react";
import "./Likes.css";
import {ControlLabel } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";
import UserLabel from "./UserLabel";

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo:   null,
            results:      null,
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
        // if (this.state.userInfo === null && this.props.userInfo && this.props.userInfo.id  ){
        //     this.setState({userInfo: this.props.userInfo,})
        // }
        // temporary fixs
        if (this.state.results === null && this.props.results !== null)
            this.setState({results: this.props.results})
        // if (this.state.likes === null && this.state.userInfo && this.state.userInfo.id) {
            // Make back end call to get list of user's likes
            // try {
            //     fetch('/uaer/likes' + this.state.userInfo.id, {
            //       method: "GET",
            //       headers: {
            //         "Content-Type": "application/json; charset=utf-8",
            //       },
            //     })
            //     .then(response => response.json())
            //     .then((responseJSON) => {  
            //         this.setState({likes: responseJSON["data"]})
            //     })
            //     .catch(err => console.error(err))
            // } catch (e) {
            //   alert(e.message);
            // }
        // }
    }

    componentDidUpdate() {
        if (this.state.userInfo === null && this.props.userInfo && this.props.userInfo.id  ){
            this.setState({userInfo: this.props.userInfo,})
        }
        // temporary fixs
        if (this.state.results === null && this.props.results !== null)
            this.setState({results: this.props.results})
        // if (this.state.likes === null && this.state.userInfo && this.state.userInfo.id) {
            // Make back end call to get list of user's likes
            // try {
            //     fetch('/uaer/likes' + this.state.userInfo.id, {
            //       method: "GET",
            //       headers: {
            //         "Content-Type": "application/json; charset=utf-8",
            //       },
            //     })
            //     .then(response => response.json())
            //     .then((responseJSON) => {  
            //         this.setState({likes: responseJSON["data"]})
            //     })
            //     .catch(err => console.error(err))
            // } catch (e) {
            //   alert(e.message);
            // }
        // }
    }

    renderUsername(user) {
        const { open } = this.state;
        return (<div>
            <div className="username"><p onClick={this.onOpenModal}>{user.user_name}</p></div>
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ControlledTabs userInfo={user} />
                </Modal>
            </div></div>
        )
    }

    renderResults(results) {
        var resultUsers = []

        for (var elem = 0; results[elem]; elem++) {
            if (results[elem] && results[elem].pic && results[elem].user_name) {
                resultUsers.push(
                   <UserLabel user={results[elem]} key={elem}/>
                )
            }
        }
        return resultUsers;
    }

    render() {
        const results = this.state.results;

        console.log("SEARCHRESULTS results:")
        console.info(results)

        //Do a check if there's a result type, then either show that, or show loading
        return (this.state.results ?
          <div id="likes">
            <div className="list">{this.renderResults(results)}</div>
          </div>
          : <ControlLabel> Loading ... </ControlLabel>
        )
      }
}