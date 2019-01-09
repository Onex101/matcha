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
Image.prototype.getAllPics = function (callback){
	console.log(this.data);
	db.query(`SELECT pic FROM pictures WHERE user = '${this.data.user_id}'`, function (err, results) {
		if (err){
			throw err;
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

//deletes pic of the given picId
Image.prototype.deletePic = function (callback){
	console.log(this.data);
	db.query(`DELETE FROM pictures WHERE id = '${this.data.id}')`, function (err, results) {
		if (err){
			throw err;
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
	console.log(this.data);
	db.query(`INSERT INTO pictures(pic, user_id) VALUES('${this.data.pic}','${this.data.user_id}')`, function (err, results) {
		if (err){
			throw err;
			callback(err, null);
		}
		else{
			db.query(`DELETE pictures FROM pictures LEFT JOIN users ON pictures.id = users.profile_pic_id
			WHERE pictures.user_id = ${this.data.user_id} AND pictures.id NOT IN
			(SELECT id FROM( SELECT id FROM pictures WHERE user_id = ${this.data.user_id} ORDER BY id DESC LIMIT 4) x ) 
			AND user_name IS NULL`, function (err, results) {
				if (err){
					throw err;
					callback(err, null);
				}
				else{
					callback(null, results);
				}
			})
		}
	})
}

//function returns the base64 of the given user's profile picture
Image.prototype.getProfilePic = function (user_id, callback){
	db.query(`SELECT pic FROM pictures JOIN users ON pictures.id = user.profile_pic_id WHERE user = '${user_id}'`, function (err, results) {
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
	db.query(`SELECT pic FROM pictures WHERE id = ${id}`, function (err, results) {
		if (err)
			callback(err, null);
		else
			callback(null, results);
	})
}

Image.prototype.setProfilePic = function (callback){
	db.query(`UPDATE TABLE users SET profile_pic_id = '${this.data.pic_id}' WHERE user = '${this.data.user_id}'`, function (err, results) {
	if (err){
		callback(err, null);
	}
	else{
			callback(null, results);
		}
	})
}

module.exports = Image;