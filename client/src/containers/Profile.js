import React, { Component } from "react";
import "./Profile.css";
import heart from './imgs/heart.png';
import x from './imgs/x.png';
import report from './imgs/report.png';
import block from './imgs/block.png';
import { ControlLabel } from "react-bootstrap";
import temp from './imgs/profile-placeholder.png';
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';
import { NOTIFICATION } from "../Events";

function _calculateAge(birth_date) { // birthday is a date
    var birthday = new Date(birth_date);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            user_name: null,
            file: '',
            imagePreviewUrl: '',
            profile: null,
            pictures: [],
            bio: null,
            gender: null,
            pref: null,
            gps_lat: null,
            gps_lon: null,
            tags: null,
            visits: [],
            dist_compare: null,
            userDetails: null,
            showLike: null,
            choices: null,
            relationSet: false,
        }
    }

    // Gets user info
    getInfo() {
        console.log("userINFO")
        console.info(this.props)
        this.setState({
            id: this.props.userInfo.id,
            user_name: this.props.userInfo.user_name,
            gender: this.props.userInfo.gender,
            pref: this.props.userInfo.pref,
            bio: this.props.userInfo.bio,
            gps_lat: this.props.userInfo.gps_lat,
            gps_lon: this.props.userInfo.gps_lon,
            profile: this.props.userInfo.pic,
            fame: this.props.userInfo.fame,
        });
        if (this.props.userInfo.gps_lat != null && this.props.userInfo.gps_lon != null) {
            console.log("Lat: " + this.props.userInfo.gps_lat + " Long: " + this.props.userInfo.gps_lon);
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.props.userInfo.gps_lat + ',' + this.props.userInfo.gps_lon + '&key=' + "AIzaSyDKEXlzFbGtbXxHkUy6GSdFCofq5BI_oVo")
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                    var location = null;
                    for (var x in responseJson) {
                        for (var y in responseJson[x]) {
                            if (typeof responseJson[x][y] == "object" && "types" in responseJson[x][y]) {
                                if (responseJson[x][y]["types"][0] == "administrative_area_level_2") {
                                    location = responseJson[x][y]["formatted_address"];
                                }
                            }
                        }
                    }
                    if (location == null)
                        for (var x in responseJson) {
                            for (var y in responseJson[x]) {
                                if (typeof responseJson[x][y] == "object" && "types" in responseJson[x][y]) {
                                    if (responseJson[x][y]["types"][0] == "establishment") {
                                        location = responseJson[x][y]["formatted_address"];
                                    }
                                }
                            }
                        }
                    this.setState({ dist_compare: location });
                })

        }
        var tags = this.props.userInfo.interests
        if (tags != null && tags != "null")
            tags = tags.split(",")
        else
            tags = null
        this.setState({ tags: tags })
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
                    this.setState({ visits: responseJSON })
                })
                .catch(err => console.error(err))
        } catch (e) {
            alert(e.message);
        }
    }

    // Gets user images
    getUserImages() {
        if (this.state.id && !this.state.pictures[0]) {
            // console
            try {
                fetch('/image/' + this.state.id, {
                    // fetch('/images/' + '101', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                })
                    .then(response => response.json())
                    .then((responseJSON) => {

                        var pic1 = responseJSON[0] ? responseJSON[0] : null;
                        var pic2 = responseJSON[1] ? responseJSON[1] : null;
                        var pic3 = responseJSON[2] ? responseJSON[2] : null;
                        var pic4 = responseJSON[3] ? responseJSON[3] : null;
                        var pic5 = responseJSON[4] ? responseJSON[4] : null;

                        var newPics = [{ id: null, pic: null },
                        { id: null, pic: null },
                        { id: null, pic: null },
                        { id: null, pic: null },
                        { id: null, pic: null }];

                        newPics[0].id = pic1 ? pic1.id : null;
                        newPics[0].pic = pic1 ? pic1.pic : temp;
                        newPics[1].id = pic2 ? pic2.id : null;
                        newPics[1].pic = pic2 ? pic2.pic : temp;
                        newPics[2].id = pic3 ? pic3.id : null;
                        newPics[2].pic = pic3 ? pic3.pic : temp;
                        newPics[3].id = pic4 ? pic4.id : null;
                        newPics[3].pic = pic4 ? pic4.pic : temp;
                        newPics[4].id = pic5 ? pic5.id : null;
                        newPics[4].pic = pic5 ? pic5.pic : temp;

                        this.setState({ pictures: newPics });
                        this.setState({ profile: newPics[0].pic });
                        // console.log("Result = ");
                        // console.info(this.state.pictures);
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        }
    }

    renderTags() {
        if (this.state.tags) {
            var tags = this.state.tags
            // console.log("Tags: ")
            // console.info(tags)
            // tags= tags.split(",")
            // console.log("Tags: " + tags)
            var rows = [];
            for (var elem in tags) {
                // console.log("Tags[" + elem + "] loop: " + tags[elem])
                rows.push(<div key={elem} className="tags">{tags[elem]}</div>);
            }
            // console.log("Tag rows:")
            // console.info(rows)
            return <div>{rows}</div>;
        }
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

    like(e, notify) {
        console.log(this.props)
        this.props.closeModal();
        const socket = this.props.socket;
        socket.emit(NOTIFICATION, localStorage.getItem('name') + ' has liked you', this.props.userInfo.user_name);
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
        //TODO: close modal and refresh page
        if (notify === true) {
            console.log("Notify that like has liked back")
            const socket = this.props.socket;
            socket.emit(NOTIFICATION, "Psst! " + localStorage.getItem('user') + " has liked you back!", this.props.userInfo.user_name);
        }
    }

    dislike(e, notify) {
        e.preventDefault();
        this.props.closeModal();
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
        if (notify === true) {
            console.log("Notify that match has disliked")
            const socket = this.props.socket;
            socket.emit(NOTIFICATION, "Oh dear! Your Match " + localStorage.getItem('user') + " has unliked you...", this.props.userInfo.user_name);
        }
    }

    report(e) {
        e.preventDefault();
        this.props.closeModal();
        if (this.props.userInfo.user_name && this.props.userInfo.email) {
            this.props.socket.emit('REPORT', this.props.userInfo.user_name, this.props.userInfo.email)
            this.props.getMatches();
        } else {
            console.log("Invalid information: " + this.props.userInfo.user_name + ", " + this.props.userInfo.email)
        }
    }

    block(e) {
        e.preventDefault()
        this.props.closeModal();
        try {
            fetch('/block/' + localStorage.getItem('id') + '/' + this.props.userInfo.id, {
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
        console.log("Block")
    }

    componentDidMount() {
        // console.log("Profile INFO 1: " +JSON.stringify(this.props.userInfo))
        // console.log("THE PROFILE HAS MOUNTED")
        if (this.state.id === null && this.props.userInfo && this.props.userInfo.id) {
            this.getInfo();
            this.getVisits();
        }
        if (this.state.id && !this.state.pictures[0]) {
            //get more info
            this.getUserImages();
        }
        // console.log("Profile State INFO 1: " +JSON.stringify(this.state))
        if (this.state.userDetails == null) {
            //Make server call to get all information for the profile
            // Fame, Visits, Name, Surname, Distance, Age
            // console.log("DETAILS TEST 1")
            // this.getUserDetails()
        }
        if (this.props.showLike != null && this.props.showLike == false) {
            this.setState({ showLike: this.props.showLike })
            console.log("NO LIKE BUTTON");
        }
    }

    componentDidUpdate() {
        // console.log("Profile INFO 2: " +JSON.stringify(this.props.userInfo))
        if (this.props.userInfo) {
            // if (this.props.userInfo.id)
            // console.log("Profile Props test: " +JSON.stringify(this.props.userInfo.id))
        }
        if (this.props.userInfo && this.props.userInfo.id && !this.state.id) {
            this.getInfo();
            this.getVisits();
        }
        if (this.state.id && !this.state.pictures[0]) {
            //get more info
            this.getUserImages();
        }
        // console.log("Profile State INFO 2: " +JSON.stringify(this.state))
        // if (this.state.userDetails == null) {
        //Make server call to get all information for the profile
        // Fame, Visits, Name, Surname, Distance, Age
        // this.getUserDetails()
        // }
        if (this.props.showLike != null && this.props.showLike == false && this.state.showLike == null) {
            this.setState({ showLike: this.props.showLike })
            console.log("NO LIKE BUTTON")
        }

        if (this.props.userInfo.id != localStorage.getItem('id') && !this.state.relationSet) { this.getRelation() }
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

    renderOnlineStatus() {
        if (this.props.userInfo.online) {
            return (<div id="online-status">Last seen {this.timeSince(new Date(this.props.userInfo.online))} ago</div>)
        } else {
            return (<div id="online-status">online</div>)
        }
    }

    getRelation() {
        if (this.props.userInfo.id != localStorage.getItem('id')) {
            var choices = [];
            try {
                fetch('/likecode/' + localStorage.getItem('id') + '/' + this.props.userInfo.id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                })
                    .then(response => response.json())
                    .then((responseJSON) => {
                        console.log("RELATION TEST");
                        console.log(responseJSON);
                        console.log(responseJSON[0]);
                        this.setState({relationSet: true})

                        if ((responseJSON[0].user1_likes_user2 === "false" && responseJSON[0].user1_no_relation_user2 === "false") || (responseJSON[0].user1_likes_user2 === "false" && responseJSON[0].user1_no_relation_user2 === "true")) {
                            console.log("You can like");

                            if ((responseJSON[0].user2_likes_user1 === "true" && responseJSON[0].user2_no_relation_user1 === "false")) {
                                console.log("Notify the user 2 of like like")
                                choices.push(<img src={heart} key="Like" alt="Like" className="like" onClick={(e) => this.like(e, true)} />);
                            } else {
                                console.log("Don't notify of like like")
                                choices.push(<img src={heart} key="Like" alt="Like" className="like" onClick={(e) => this.like(e, false)} />)
                            }
                        }
                        //  else if (responseJSON[0].user1_likes_user2 === "false" && responseJSON[0].user1_no_relation_user2 === "true") {
                        //     //You have done nothing, you can do anything
                        // }
                        if ((responseJSON[0].user1_likes_user2 === "true" && responseJSON[0].user1_no_relation_user2 === "true") || (responseJSON[0].user1_likes_user2 === "false" && responseJSON[0].user1_no_relation_user2 === "true")) {
                            console.log("You can dislike");
                            if (responseJSON[0].users_like_eachother === "true") {
                                console.log("Send match unlikes notification")
                                choices.push(<img src={x} key="Dislike" alt="Dislike" className="dislike" onClick={(e) => this.dislike(e, true)} />)
                            } else {
                                choices.push(<img src={x} key="Dislike" alt="Dislike" className="dislike" onClick={(e) => this.dislike(e, false)} />)
                            }
                        }

                        // if (responseJSON[0].user1_likes_user2 === "false") {
                        //     console.log("Show like button")
                        //     if (responseJSON[0].user2_likes_user1 === "true") {
                        //         console.log("Send likes likes notification")
                        //         choices.push(<img src={heart} key="Like" alt="Like" className="like" onClick={(e) => this.like(e, true)} />);
                        //     } else {
                        //         choices.push(<img src={heart} key="Like" alt="Like" className="like" onClick={(e) => this.like(e, false)} />)
                        //     }
                        // }
                        // if (responseJSON[0].user1_dislikes_user2 === "false") {
                        // if (true) {
                        //     if (responseJSON[0].users_like_eachother === "true") {
                        //         console.log("Send match unlikes notification")
                        //         choices.push(<img src={x} key="Dislike" alt="Dislike" className="dislike" onClick={(e) => this.dislike(e, true)} />)
                        //     } else {
                        //         choices.push(<img src={x} key="Dislike" alt="Dislike" className="dislike" onClick={(e) => this.dislike(e, false)} />)
                        //     }
                        // }

                        choices.push(<img src={block} key="Block" alt="Block" className="report" onClick={(e) => this.block(e)} />);
                        choices.push(<img src={report} key="Report" alt="Report" className="report" onClick={(e) => this.report(e)} />);
                        // return choices;
                        this.setState({ choices: <div className="choices">{choices}</div> })
                        // this.setState({ visits: responseJSON })
                    })
                    .catch(err => console.error(err))
            } catch (e) {
                alert(e.message);
            }
        }
    }

    render() {
        // console.log("INFO 2:");
        // console.info(this.props)
        const info = this.state;
        // console.log(info)
        // console.log("STATE INFO: " +JSON.stringify(this.state.tags))
        var width = 150
        var height = 150
        return (
            this.state.id && this.state.pictures[0] ?
                // this.props.userInfo && this.props.userInfo.id && this.state.id && this.state.pictures[0] ?
                <div id="profile">
                    <div className="top">
                        <div className="left">
                            <div className="profile-pic">
                                {this.avatar(info.pictures[0].pic, width, height)}
                            </div>
                            <div className="user-images">
                                {this.avatar(this.state.pictures[1].pic, 60, 60)}
                                {this.avatar(this.state.pictures[2].pic, 60, 60)}
                                {this.avatar(this.state.pictures[3].pic, 60, 60)}
                                {this.avatar(this.state.pictures[4].pic, 60, 60)}
                            </div>
                            <div className="profile-info">
                                <h4>Fame : {info.fame}</h4>
                                <br />
                                <h4>Visits : {this.state.visits.length}</h4>
                            </div>
                        </div>
                        <div className="right">
                            <br />
                            <div className="username"><br /><h2 onClick={this.onOpenModal}>{info.user_name}</h2></div>
                            {this.renderOnlineStatus()}
                            <hr />
                            <div className="user-info">
                                <br />
                                {this.props.userInfo.first_name && this.props.userInfo.last_name && this.props.userInfo.birth_date ?
                                    <h3>{this.props.userInfo.first_name} {this.props.userInfo.last_name} | {_calculateAge(this.props.userInfo.birth_date)}</h3>
                                    : <h3>Firstname Surname | Age</h3>}
                                <br />
                                {info.id !== localStorage.getItem('id') ?
                                    <h3>{info.dist_compare}</h3>
                                    : null}
                                <br />
                                <h3>Gender</h3>
                                <div className="slider-grp">
                                    <img src={female} alt="Female" />
                                    <input
                                        className="slider"
                                        autoFocus
                                        disabled={true}
                                        type="range"
                                        min="0" max="1" step="0.01"
                                        defaultValue={this.state.gender}
                                    />
                                    <img src={male} alt="Male" />
                                </div>
                                <br />
                                <h3>Interest</h3>
                                <div className="slider-grp">
                                    <img src={female} className='gender' alt="Female" />
                                    <input
                                        autoFocus
                                        disabled={true}
                                        type="range"
                                        min="0" max="1" step="0.01"
                                        defaultValue={this.state.pref}
                                    />
                                    <img src={male} alt="Male" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bottom">
                        <hr /><br />
                        {info.bio !== "null" ? <div><h4>Bio</h4>
                            {info.bio}</div> : null}
                        <br /><br />
                        {info.tags !== null ? <div><h4>Tags</h4><br />
                            {this.renderTags()}</div>
                            : null}
                    </div>
                    {/* {this.props.userInfo.id != localStorage.getItem('id') ?
                        this.renderChoices()
                        : null} */}
                    {this.state.choices}
                    {/* {this.mainPanel(this.props.props)} */}
                </div>
                : <ControlLabel> Loading ... </ControlLabel>
        )
    }
}