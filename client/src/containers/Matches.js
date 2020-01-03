import React, { Component } from "react";
import "./Matches.css";
import { ControlLabel } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import ControlledTabs from "./Tabs";
import UserLabel from "./UserLabel";

export default class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            likes: null,
            open: false,
            visits: null,
            liked: null,
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
    getUserProfile() {
        //For if wwe no longer return the profile pic on user Info
    }

    avatar(image, width, height) {
        // console.log(image)
        var avatarImage = image,
            style = {
                width: width || 50,
                height: height || 50
            };
        if (!avatarImage) return null;
        return (<img className="avatar" style={style} src={avatarImage} alt="" />);
    }

    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    getVisits() {
        try {
            fetch('/user/' + this.props.userInfo.id + '/history', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(response => response.json())
                .then((responseJSON) => {
                    // console.log("VISITS TEST");
                    // console.log(responseJSON);
                    var cleanVisits = this.removeDuplicates(responseJSON, "id")
                    this.setState({ visits: cleanVisits })
                })
                .catch(err => console.error(err))
        } catch (e) {
            alert(e.message);
        }
    }

    getLikes() {
        try {
            fetch('/user/' + this.props.userInfo.id + '/liked', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(response => response.json())
                .then((responseJSON) => {
                    console.log("LIKED TEST");
                    console.log(responseJSON);
                    this.setState({ liked: responseJSON })
                })
                .catch(err => console.error(err))
        } catch (e) {
            alert(e.message);
        }

        try {
            fetch('/user/' + this.props.userInfo.id + '/liked', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(response => response.json())
                .then((responseJSON) => {
                    console.log("LIKED TEST");
                    console.log(responseJSON);
                    this.setState({ liked: responseJSON })
                })
                .catch(err => console.error(err))
        } catch (e) {
            alert(e.message);
        }
    }

    componentDidMount() {
        if (this.state.userInfo === null && this.props.userInfo && this.props.userInfo.id) {
            this.setState({ userInfo: this.props.userInfo, })
        }
        if (this.state.userInfo && !this.state.visits) {
            this.getVisits()
        }

        if (this.state.userInfo && !this.state.liked) {
            this.getLikes()
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
                        this.setState({ likes: responseJSON })
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        }
    }

    componentDidUpdate() {
        if (this.state.userInfo === null && this.props.userInfo && this.props.userInfo.id) {
            this.setState({ userInfo: this.props.userInfo, })
        }
        if (this.state.userInfo && !this.state.visits) {
            this.getVisits()
        }

        if (this.state.userInfo && !this.state.liked) {
            this.getLikes()
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
                        this.setState({ likes: responseJSON })
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
        if (likes) {
            for (var elem = 0; elem < likes.length; elem++) {
                if (likes[elem] && likes[elem].pic && likes[elem].user_name) {
                    likedUsers.push(
                        <UserLabel user={likes[elem]}
                            socket={this.props.socket}
                            key={elem} />
                    )
                }
            }
        }
        return likedUsers;
    }

    timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    renderVisits(visits) {
        var visitedUsers = []

        if (visits) {
            for (var elem = 0; elem < visits.length; elem++) {
                if (visits[elem] && visits[elem].pic && visits[elem].user_name) {
                    var time = this.timeSince(new Date(visits[elem].timestamp));
                    visitedUsers.push(<div id='visitsList' key={elem}>
                        <div id="listLabel">
                            <UserLabel user={visits[elem]}
                                socket={this.props.socket}
                                key={elem} /></div>
                        <p id='visitTime'>{time}</p></div>
                    )
                }
            }
        }
        return visitedUsers;
    }

    render() {
        const likes = this.state.likes;
        // return (this.state.likes && this.state.userInfo ?
        return (this.state.userInfo ?
            <div id="connections">
                <ControlLabel>Matches</ControlLabel>
                <div id="likes">
                    <div className="list">{this.renderLikes(likes)}</div>
                </div>
                <br />
                <ControlLabel>Likes</ControlLabel>
                <div id="likes">
                    <div className="list">{this.renderLikes(likes)}</div>
                </div>
                <br />
                <ControlLabel>Visits</ControlLabel>
                <div id="likes">
                    <div className="list">{this.renderVisits(this.state.visits)}</div>
                </div>
            </div>
            : <ControlLabel> Loading ... </ControlLabel>
        )
    }
}