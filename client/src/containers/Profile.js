import React, { Component } from "react";
import "./Profile.css";
import heart from './imgs/heart.png';
import x from './imgs/x.png';
import Modal from 'react-responsive-modal';
import {ControlLabel } from "react-bootstrap";
import temp from './imgs/profile-placeholder.png';
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';

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
            tags: [{id: 1, name: "apples"}, {id: 2, name: "pears"}],
            dist_compare:  null
        }
    }

    // Gets user info
    getInfo(){
        this.setState({id: this.props.userInfo.id,
            user_name: this.props.userInfo.user_name,
            gender: this.props.userInfo.gender,
            pref: this.props.userInfo.pref,
            bio: this.props.userInfo.bio,
            gps_lat: this.props.userInfo.gps_lat,
            gps_lon: this.props.userInfo.gps_lon,
            profile: this.props.userInfo.pic,
            tags: this.props.userInfo.interests,
             });
        // console.log("STATE: ");
        // console.info(this.state);
    }

    // Gets user images
    getUserImages(){
        if (localStorage.getItem('id') && !this.state.pictures[0]){
            try {
              fetch('/image/' + localStorage.getItem('id'), {
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
                  var pic5 = responseJSON[4] ?  responseJSON[4] : null;

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

                this.setState({ pictures: newPics});
                this.setState({ profile:  newPics[0].pic});
                // console.log("Result = ");
                // console.info(this.state.pictures);
              })
              .catch(err => console.error(err))
              } catch (e) {
                alert(e.message);
              }
        }
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

    like(e){
      e.preventDefault();
      console.log("Yay")
    }

    dislike(e){
      e.preventDefault();
      console.log("Nay")
    }

    componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.id && !this.state.id){
            this.getInfo();
            //get more info
            this.getUserImages();
        }
    }

    componentDidUpdate() {
        if (this.props.userInfo && this.props.userInfo.id && !this.state.id){
            this.getInfo();
            //get more info
            this.getUserImages();
        }
    }

    render() {
        // console.log("INFO 2:");
        // console.info(this.props.props)
        const info = this.state;
        console.log("INFO: " +JSON.stringify(this.props.userInfo))
        var width=150
        var height=150
        return (this.props.userInfo && this.props.userInfo.id && this.state.id && this.state.pictures[0] ?
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
                        <br/>
                        <h4>Visits : {info.visits}</h4>
                    </div>
                </div>
                <div className="right">
                    <br />
                    <div className="username"><br/><h2 onClick={this.onOpenModal}>{info.user_name}</h2></div>
                    <hr />
                    <div className="user-info">
                    <br />
                        {this.props.userInfo.name ? 
                            <h3>{this.props.userInfo.name} {this.props.userInfo.surname} | {this.props.userInfo.age}</h3>
                            : <h3>Firstname Surname | Age</h3>}
                        <br />
                        {info.id != localStorage.getItem('id') ?
                            <h3>{info.dist_compare} from you.</h3>
                            : null}
                        <br/>
                        <h3>Gender</h3>
                        <div className="slider-grp">
                            <img src={female} alt="Female" />
                            <input
                            className="slider"
                            autoFocus
                            disabled={true}
                            type="range"
                            min="0" max="1" step="0.01" 
                            defaultValue={ this.state.gender } 
                            />
                            <img src={male} alt="Male" />
                        </div>
                        <br/>
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
                <hr /><br/>
                {/* <div className="left"> */}
                {info.bio != "null" ? <div><h4>Bio</h4>
                                        {info.bio}</div> : null}
                    <h4>Tags</h4>
                {/* </div> */}
                {/* <div className="right"> */}
                    {/* <h4>Likes</h4> */}
                {/* </div> */}
            </div>
            {this.props.userInfo.id != localStorage.getItem('id') ? 
                <div className="choices">
                    <img src={x} alt="Dislike" className="dislike" onClick={(e) => this.dislike(e)}/>
                    <img src={heart} alt="Like" className="like" onClick={(e) => this.like(e)} />
                    <img src={x} alt="Report" className="report" onClick={(e) => this.like(e)} />
                </div>
                : null}
            {/* {this.mainPanel(this.props.props)} */}
          </div>
          : <ControlLabel> Loading ... </ControlLabel>
        )
      }
}