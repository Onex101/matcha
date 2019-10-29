var db = require("../db.js");
var schemas = require("../schemas.js");
var mysql = require('mysql');
var _ = require("lodash");

var Notification = function (data) {
    this.data = this.clean(data);
}

Notification.prototype.clean = function (data) {
	data = data || {};
	var schema = schemas.notification;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Notification.prototype.data = {}

Notification.prototype.setNoti = function (user_id, msg, callback) {
	db.query(`UPDATE notifications SET noti = ${msg} WHERE user_id = ${user_id}`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Notification.prototype.setRead = function (id, callback) {
	db.query(`UPDATE notifications SET viewed_status = 0 WHERE id = ${id}`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Notification.prototype.getUnread = function (user_id, callback) {
	db.query(`SELECT * FROM notifications WHERE user_id = ${user_id} AND viewed_status = 0`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Notification.prototype.insertNoti = function (user_id, message, callback) {
	db.query(`INSERT INTO notifications (user_id, noti) VALUES (${user_id}, '${message}')`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

module.exports = Notification;