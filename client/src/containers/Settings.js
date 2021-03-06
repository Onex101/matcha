import React, { Component } from "react";
// import { HelpBlock, ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ButtonGroup, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { ReactTags } from "react-tag-autocomplete";
import "./Settings.css";
import female from './imgs/female_logo/favicon-32x32.png';
import male from './imgs/male_logo/favicon-32x32.png';
import temp from './imgs/profile-placeholder.png';
const ReactTags = require('react-tag-autocomplete')

export default class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			file: '',
			imagePreviewUrl: '',
			profile: null,
			profile_id: null,
			pictures: [],
			bio: null,
			gender: null,
			pref: null,
			gps_lat: null,
			gps_lon: null,
			tags: null,
			suggestions: null,
			firstname: null,
			lastname: null,
			email: null,
		}
	}

	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
		// console.log('handle uploading-', this.state.file);
	}

	// Handles Image for preview
	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}
		reader.onerror = function (evt) {
			console.error("An error ocurred reading the file", evt);
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(file);
		}
	}

	// Placeholder for preview
	preview() {
		var imagePreviewUrl = this.state.imagePreviewUrl;

		if (imagePreviewUrl) {
			return (<img src={imagePreviewUrl} className="preview" alt="Preview" />);
		} else {
			return (<div className="previewText">Please select an Image for Preview</div>);
		}
	}

	// Checks if profile picture exists
	profileCheck() {
		if (this.state.profile === null || this.state.profile === "")
			return false
		else
			return true
	}

	pics() {
		var profile, pic1, pic2, pic3, pic4;

		if (this.state.profile)
			profile = this.state.profile;
		else
			profile = temp;
		if (this.state.pictures[1] && this.state.pictures[1].pic)
			pic1 = this.state.pictures[1].pic;
		else
			pic1 = temp;
		if (this.state.pictures[2] && this.state.pictures[2].pic)
			pic2 = this.state.pictures[2].pic;
		else
			pic2 = temp;
		if (this.state.pictures[3] && this.state.pictures[3].pic)
			pic3 = this.state.pictures[3].pic;
		else
			pic3 = temp;
		if (this.state.pictures[4] && this.state.pictures[4].pic)
			pic4 = this.state.pictures[4].pic;
		else
			pic4 = temp;

		return (<div className="imgBar">
			<div className="profile-thumbnail" id="prof" ref="prof">
				<div className="profile-elems">
					<img src={profile} className='profile_thumb' alt="Profile pic" />
				</div>
				<Button
					bsSize="large"
					type="submit"
					className="submitButton"
					onClick={(e) => this.handleImgChange('profile', e)} >Update</Button>
			</div>
			<br />
			<div className="img-thumbnail">
				<div className="profile-elems">
					<img src={pic1} className='img_thumb' alt="IMG 1" />
				</div>
				<Button
					bsSize="large"
					type="submit"
					className="img-submitButton"
					disabled={!this.profileCheck()}
					onClick={(e) => this.handleImgChange('img1', e)} >Update</Button>
			</div>
			<div className="img-thumbnail">
				<div className="profile-elems">
					<img src={pic2} className='img_thumb' alt="IMG 2" />
				</div>
				<Button
					bsSize="large"
					type="submit"
					className="img-submitButton"
					disabled={!this.profileCheck()}
					onClick={(e) => this.handleImgChange('img2', e)} >Update</Button>
			</div>
			<div className="img-thumbnail">
				<div className="profile-elems">
					<img src={pic3} className='img_thumb' alt="IMG 3" />
				</div>
				<Button
					bsSize="large"
					type="submit"
					className="img-submitButton"
					disabled={!this.profileCheck()}
					onClick={(e) => this.handleImgChange('img3', e)} >Update</Button>
			</div>
			<div className="img-thumbnail">
				<div className="profile-elems">
					<img src={pic4} className='img_thumb' alt="IMG 4" />
				</div>
				<Button
					bsSize="large"
					type="submit"
					className="img-submitButton"
					disabled={!this.profileCheck()}
					onClick={(e) => this.handleImgChange('img4', e)} >Update</Button>
			</div>
		</div>
		)
	}

	// Update geo location
	geoFindMe = () => {
		if (!navigator.geolocation) {
			// console.log("Geolocation is not supported by your browser");
			return;
		}
		const success = (position) => {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			// console.log("Latitude is " + latitude + "° Longitude is " + longitude + "°");
			this.setState({ gps_lat: latitude });
			this.setState({ gps_lon: longitude });
			try {
				fetch('/user/update/location/' + this.state.id + '/' + latitude + '/' + longitude, {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						console.log("GPS response: ", responseJSON)
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert("Settings 1: " + e.message);
			}
		}
		function error() {
			console.log("Unable to retrieve your location");
		}
		// console.log("Locating…");
		navigator.geolocation.getCurrentPosition(success, error);
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	// Handles Change of user's images
	handleImgChange(param, e) {
		e.preventDefault();
		var newPics;
		if (param === 'profile') {
			this.setState({ profile: this.state.imagePreviewUrl });
			newPics = this.state.pictures;
			newPics[0].pic = this.state.imagePreviewUrl;
			// console.log("New pics: ")
			// console.info(newPics)
			this.setState({ pictures: newPics });
		}
		else if (param === 'img1') {
			newPics = this.state.pictures;
			newPics[1].pic = this.state.imagePreviewUrl;
			// console.log("New pics: ")
			// console.info(newPics)
			this.setState({ pictures: newPics });
		}
		else if (param === 'img2') {
			newPics = this.state.pictures;
			newPics[2].pic = this.state.imagePreviewUrl;
			// console.log("New pics: ")
			// console.info(newPics)
			this.setState({ pictures: newPics });
		}
		else if (param === 'img3') {
			newPics = this.state.pictures;
			newPics[3].pic = this.state.imagePreviewUrl;
			// console.log("New pics: ")
			// console.info(newPics)
			this.setState({ pictures: newPics });
		}
		else if (param === 'img4') {
			newPics = this.state.pictures;
			newPics[4].pic = this.state.imagePreviewUrl;
			// console.log("New pics: ")
			// console.info(newPics)
			this.setState({ pictures: newPics });
		}
	}

	// Handle Delete of Tag
	handleDelete(i) {
		const tagDelete = this.state.tags[i]
		// console.log("Deleting tags: ")
		// console.info(tagDelete)
		const tags = this.state.tags.slice(0)
		tags.splice(i, 1)
		this.setState({ tags })
		//Make tag delete call
		try {
			fetch(`/interests/delete/` + this.state.id + `/` + tagDelete.name, {
				method: "GET",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			})
				.then(response => response.json())
				.then((responseJSON) => {
					// console.log(responseJSON);
				})
				.catch(err => console.error(err))
		} catch (e) {
			alert(e.message);
		}
	}

	// Handle Addition of Tag to user profile    
	handleAddition(tag) {
		const tags = this.state.tags;
		tag.name = tag.name.toLowerCase();
		if (tags.length < 10) {
			tags.push({ id: tag.id, name: tag.name })
			this.setState({ tags })
			// console.log("Tags: ")
			// console.info(this.state.tags)
			//Make tag add call
			try {
				fetch(`/interest/` + this.state.id + `/` + tag.name, {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						// console.log(responseJSON);
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert(e.message);
			}
		}
	}

	// Gets user info
	getInfo() {
		this.setState({
			id: this.props.userInfo.id,
			gender: this.props.userInfo.gender,
			pref: this.props.userInfo.pref,
			gps_lat: this.props.userInfo.gps_lat,
			gps_lon: this.props.userInfo.gps_lon,
			profile_id: this.props.userInfo.profile_pic_id,
			profile: this.props.userInfo.pic,
			tags: this.props.userInfo.interests || null,
			firstname: this.props.userInfo.first_name,
			lastname: this.props.userInfo.last_name,
			email: this.props.userInfo.email,
		});
		if (this.props.userInfo.bio !== null && this.props.userInfo.bio !== "null")
			this.setState({ bio: this.props.userInfo.bio })
		else
			this.setState({ bio: null })
		if (this.state.tags === null && this.props.userInfo.id) {
			try {
				// console.log("Tags test")
				// console.info(this.props.userInfo.id)
				fetch('/user/' + this.props.userInfo.id + '/interests', {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						if (responseJSON.length === 0)
							this.setState({ tags: [] })
						else {
							this.setState({ tags: responseJSON })
						}
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert("Settings 3: " + e.message);
			}
		}
		// Get suggestions
		if (this.state.suggestions === null) {
			try {
				fetch('/interests/', {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						this.setState({ suggestions: responseJSON })
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert("Settings 3: " + e.message);
			}
		}
	}

	// Updates user info
	updateInfo() {
		// event.preventDefault();

		try {
			//   const user = this.state;
			// console.log(this.state.firstname + "   " + this.state.lastname + "   " + this.state.email)
			fetch(`/user/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
					id: this.state.id,
					bio: this.state.bio,
					gender: this.state.gender,
					pref: this.state.pref,
					first_name: this.state.firstname,
					last_name: this.state.lastname,
					email: this.state.email,
				})
			})
				.then(response => response.json())
				.then((responseJSON) => {
					// console.log(responseJSON);
					// console.log(responseJSON.user.data);
					//   if (responseJSON["success"]) {
					// Successfully sent
					window.location.reload();

					//   }
				})
				.catch(err => console.error(err))
		} catch (e) {
			alert("Settings 2: " + e.message);
		}
		window.location.reload();

	}

	getInterests() {
		// console.log("Getting interests 1")
		if (this.state.tags !== null)
			// console.log(this.state.tags[0])
		if (localStorage.getItem('id') && this.state.tags !== null && !this.state.tags[0]) {
			// console.log("Getting interests 2")
			try {
				// console.log("Getting interests 3")
				fetch('/user/' + localStorage.getItem('id') + '/interests', {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
				})
					.then(response => response.json())
					.then((responseJSON) => {
						// console.log("Interests response: ")
						// console.info(responseJSON)
						if (responseJSON.length > 0)
							this.setState({ tags: responseJSON })
						else
							this.setState({ tags: null })

					})
					.catch(err => console.error(err))
			} catch (e) {
				alert("Get interests:" + e.message);
			}
		}
	}

	// Gets user images
	getUserImages() {
		if (localStorage.getItem('id') && !this.state.pictures[0]) {
			try {
				fetch('/image/' + localStorage.getItem('id'), {
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
						newPics[0].pic = pic1 ? pic1.pic : null;
						newPics[1].id = pic2 ? pic2.id : null;
						newPics[1].pic = pic2 ? pic2.pic : null;
						newPics[2].id = pic3 ? pic3.id : null;
						newPics[2].pic = pic3 ? pic3.pic : null;
						newPics[3].id = pic4 ? pic4.id : null;
						newPics[3].pic = pic4 ? pic4.pic : null;
						newPics[4].id = pic5 ? pic5.id : null;
						newPics[4].pic = pic5 ? pic5.pic : null;

						this.setState({ pictures: newPics });
						this.setState({ profile: newPics[0].pic });
					})
					.catch(err => console.error(err))
			} catch (e) {
				alert("Settings 3: " + e.message);
			}
		}
	}

	// Updates user images
	updateImages() {
		const pics = this.state.pictures;
		var user_id;
		if (this.state.id)
			user_id = this.state.id;
		for (var i = 0; i < pics.length; i++) {
			if (i === 0 && pics[i].id === null && pics[i].pic) {
				//profile pic new
				// console.log("HERE");
				fetch(`/image/ProfilePic/new`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						user_id: user_id,
						data: pics[i].pic
					})
				})
					.catch(err => console.error(err))
			}
			else if (i !== 0 && pics[i].id === null && pics[i].pic) {
				// console.log("Making new image");
				//Send new image and user id
				fetch(`/image/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						user_id: user_id,
						data: pics[i].pic
					})
				})
					.catch(err => console.error(err))
			}
			else if (pics[i].id !== null && pics[i].pic !== null) {
				// console.log("Replacing old image");
				//Send replace image
				fetch('/image/replace/', {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						id: pics[i].id,
						user_id: user_id,
						// pic: pics[i].pic,
						data: pics[i].pic
					})
				})
					// .then(this.getUsers)
					.catch(err => console.error(err))
			}
		}
	}

	saveChanges(e) {
		e.preventDefault();
		if (this.state.firstname && this.state.lastname && this.state.email) {
			this.updateImages();
			this.updateInfo();
		} else {
			if (!this.state.firstname) {
				alert("First Name cannot be empty");
			} else if (!this.state.lastname) {
				alert("Last Name cannot be empty");
			} else if (!this.state.email) {
				alert("Email cannot be empty");
			} 
		}

		//Figure out a way to refresh the page nicely once save changes is pressed
		// this.setState({id: null})
	}

	// Stops the auto focus on the tags
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	componentDidUpdate() {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
		if (this.state.id === null && this.props.userInfo !== null && this.props.userInfo.id !== null) {
			this.getInfo();
			this.getInterests();
		} else {
			// console.log("No user if for you! 1");
			// console.log("STATE: ");
			// console.info(this.state);
		}
		if (this.state.id !== null && !this.state.pictures[0]) {
			this.getUserImages();
			if (this.state.profile_id === null && this.state.profile !== null && this.state.pictures[0]) {
				// update profile route
				// /image/setProfilePic/:user_name/:pic_id
				try {
					fetch(`/image/setProfilePic/` + this.state.user_name + `/` + this.state.pictures[0].id, {
						method: "GET",
						headers: {
							"Content-Type": "application/json; charset=utf-8",
						},
					})
						.then(response => response.json())
						.then((responseJSON) => {

						})
						.catch(err => console.error(err))
				} catch (e) {
					alert("Settings 4: " + e.message);
				}
			}
		}
		else {
			// console.log("No image if for you! 1");
			// console.log("STATE: ");
			// console.info(this.state);
		}
	}

	renderTags() {
		if (this.state.tags && this.state.tags.constructor === Array && this.state.suggestions) {
			return (<ReactTags
				allowNew={true}
				autofocus={false}
				placeholder='Add new/existing tag'
				tags={this.state.tags}
				suggestions={this.state.suggestions}
				handleDelete={this.handleDelete.bind(this)}
				handleAddition={this.handleAddition.bind(this)} />)
		}
	}

	render() {
		// console.log("PROPS")
		// console.info(this.props.userInfo)
		// if (this.state.id !== null && !this.state.pictures[0]){
		//     this.getUserImages();
		// }
		return (this.state.id ?
			<div className="settings">
				<ControlLabel>Settings</ControlLabel>
				<ul className="form-fields">
					<FormGroup bsSize="large">
						<ControlLabel>Upload Images</ControlLabel>
						<div className="settings-pictures">
							{/* View and edit current images */}
							{this.pics()}
							<br />
							<FormControl
								autoFocus
								type="file"
								// defaultValue={this.props.fieldValues.first_name}
								onChange={(e) => this._handleImageChange(e)}
							/>
							<div className="imgPreview">{this.preview()}</div>
						</div>
					</FormGroup>
					<FormGroup controlId="firstname" bsSize="small">
						<ControlLabel>First Name</ControlLabel>
						<FormControl
							componentClass="textarea"
							defaultValue={this.state.firstname}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="lastname" bsSize="small">
						<ControlLabel>Last Name</ControlLabel>
						<FormControl
							componentClass="textarea"
							defaultValue={this.state.lastname}
							onChange={this.handleChange}
						/>
					</FormGroup><FormGroup controlId="email" bsSize="small">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							componentClass="textarea"
							defaultValue={this.state.email}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="bio" bsSize="small">
						<ControlLabel>Biography</ControlLabel>
						<FormControl
							componentClass="textarea"
							placeholder="Tell us about yourself!"
							defaultValue={this.state.bio}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="gender" bsSize="small">
						<ControlLabel>Your gender</ControlLabel>
						<br />
						<div className="slider-grp">
							<img src={female} alt="Female" />
							<FormControl
								className="slider"
								autoFocus
								type="range"
								min="0" max="1" step="0.01"
								defaultValue={this.state.gender}
								onChange={this.handleChange}
							/>
							<img src={male} alt="Male" />
						</div>
					</FormGroup>
					<FormGroup controlId="pref" bsSize="small">
						<ControlLabel>Your Interest</ControlLabel>
						<br />
						<div className="slider-grp">
							<img src={female} className='gender' alt="Female" />
							<FormControl
								autoFocus
								type="range"
								min="0" max="1" step="0.01"
								defaultValue={this.state.pref}
								onChange={this.handleChange}
							/>
							<img src={male} alt="Male" />
						</div>
					</FormGroup>
					<FormGroup controlId="tags" bsSize="small">
						<ControlLabel>Your 10 Tags</ControlLabel>
						<br />
						{this.renderTags()}
					</FormGroup>
					<br />
					<ButtonToolbar>
						<ButtonGroup>
							<Button
								bsSize="large"
								className="submit_btn"
								onClick={this.geoFindMe} >Update Location!</Button>
						</ButtonGroup>
					</ButtonToolbar>
					<br />
					<ButtonToolbar>
						<ButtonGroup>
							<Button
								bsSize="large"
								className="submit_btn"
								onClick={(e) => this.saveChanges(e)} >Save Changes</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</ul>
			</div>
			: <ControlLabel> Loading ... </ControlLabel>
		)
	}
}