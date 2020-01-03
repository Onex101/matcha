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
         var lookupObject  = {};
    
         for(var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
         }
    
         for(i in lookupObject) {
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

    renderVisits(visits) {
        var visitedUsers = []
        
        if (visits) {
            // let unique = {};
            // visits.forEach(function (i) {
            //     if (!unique[i]) {
            //         unique[i] = true;
            //     }
            // });
            // console.log("UNIQUE");
            // console.info(visits.keys(unique))
            // return Object.keys(unique);

            for (var elem = 0; elem < visits.length; elem++) {
                // visitedUsers.push(<p key={elem}>{visits[elem].user_name}</p>)

                if (visits[elem] && visits[elem].pic && visits[elem].user_name) {
                    visitedUsers.push(
                        <UserLabel user={visits[elem]}
                            socket={this.props.socket}
                            key={elem} />
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