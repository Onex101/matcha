'use strict';
var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");
var mysql = require('mysql');

var Image = function (data) {
    this.data = this.clean(data);
}

Image.prototype.clean = function (data) {
	data = data || {};
	var schema = schemas.image;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

//returns a table of base64 values of pictures that belong to the given user_id
Image.prototype.getAllPics = function (user_id, callback){
	console.log(user_id);
	db.query(`SELECT id, pic FROM pictures WHERE user_id = ${user_id}`, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

//deletes pic of the given picId
Image.prototype.deletePic = function (id, callback){
	db.query(`DELETE FROM pictures WHERE id = ${id}`, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}


//saves the given picture, if after adding the picture more than 5 images exist for this user the oldest, non profile pic will be deleted
//add warning to let user know about this action
Image.prototype.savePic = function (callback){
	// console.log(this.data);
	db.query(`INSERT INTO pictures(pic, user_id) VALUES('${this.data.data}', ${this.data.user_id})`, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			// db.query(`DELETE pictures FROM pictures LEFT JOIN users ON pictures.id = users.profile_pic_id
			// WHERE pictures.user_id = ${this.data.user_id} AND pictures.id NOT IN
			// (SELECT id FROM( SELECT id FROM pictures WHERE user_id = ${this.data.user_id} ORDER BY id DESC LIMIT 4) x ) 
			// AND user_name IS NULL`, function (err, results) {
			// 	if (err){
			// 		callback(err, null);
			// 	}
			// 	else{
					callback(null, results);
				// }
			// })
		}
	})
}

//function returns the base64 of the given user's profile picture
Image.prototype.getProfilePic = function (user_name, callback){
	user_name = mysql.escape(user_name);
	db.query(`SELECT pic FROM users JOIN pictures ON profile_pic_id = pictures.id WHERE user_name = ${user_name}`, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

//returns base64 value of picture of the given pic_id
Image.prototype.getPicById = function (id, callback){
	id = mysql.escape(id);
	db.query(`SELECT id, pic FROM pictures WHERE user_id = ${id}`, function (err, results) {
		if (err)
			callback(err, null);
		else
			callback(null, results);
	})
}

Image.prototype.setProfilePic = function (user_name, pic_id, callback){
	db.query(`UPDATE users SET profile_pic_id = ${pic_id} WHERE user_name = '${user_name}'`, function (err, results) {
	if (err){callback(err, null);}
	else{
			callback(null, results);
		}
	})
}

Image.prototype.replacePic = function(callback){
	// console.log(this.data)
	db.query(`UPDATE pictures SET pic = '${this.data.data}' WHERE id = '${this.data.id}'`, function (err, results) {
		if (err){callback(err, null);}
		else{
				"Success";			}
		})
}

Image.prototype.addNewProfilePic = function(callback){
	let self = this.data;
	db.query(`INSERT INTO pictures(pic, user_id) VALUES('${self.data}', ${self.user_id})`, function (err, results) {
		if (err){callback(err, null);}
		else{
			db.query(`UPDATE users SET profile_pic_id = (SELECT id FROM pictures WHERE pic = '${self.data}' LIMIT 1)x WHERE id = '${self.user_id}'`, function (err, results) {
				if (err){callback(err, null);}
				else{
						console.log("Success");
				}
			})
		}
	})
}

module.exports = Image;