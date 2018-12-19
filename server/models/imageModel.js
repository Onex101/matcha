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

Image.prototype.getProfilePic = function (callback){
	console.log(this.data);
	//db.query(`SELECT pic FROM pictures WHERE user = '${this.data.user_name}' AND profile_pic = '1'`, function (err, results) {
	db.query(`SELECT pic FROM pictures JOIN users ON pictures.id = user.profile_pic_id WHERE user = '${this.data.user_id}'`, function (err, results) {
		if (err){
			throw err;
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

Image.prototype.getPicById = function (callback){
	console.log(this.data);
	db.query(`SELECT pic FROM pictures WHERE id = '${this.data.pic_id}'`, function (err, results) {
		if (err){
			throw err;
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

// Image.prototype.setProfilePic = function (callback){
// 	db.query(`UPDATE TABLE pictures SET profile_pic = '0' WHERE user = '${this.data.user_id}' AND profile_pic = '1'`, function (err, results) {
// 		if (err){
// 			throw err;
// 			callback(err, null);
// 		}
// 		else{
// 			db.query(`UPDATE TABLE pictures SET profile_pic = '1' WHERE id = '${this.data.pic_num}'`, function (err, results) {
// 				if (err){
// 					throw err;
// 					callback(err, null);
// 				}
// 				else{
// 					callback(null, results);
// 				}
// 			})
// 		}
// 	})
// }

Image.prototype.setProfilePic = function (callback){
	db.query(`UPDATE TABLE users SET profile_pic_id = '${this.data.pic_id}' WHERE user = '${this.data.user_id}'`, function (err, results) {
	if (err){
		throw err;
		callback(err, null);
	}
	else{
			callback(null, results);
		}
	})
}

module.exports = Image;