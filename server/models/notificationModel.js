var db = require("../db.js");
var schemas = require("../schemas.js");
var mysql = require('mysql');

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
		if (err){callback(null, err);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Notification.prototype.setRead = function (id, callback) {
	db.query(`UPDATE notifications SET viewed = '1' WHERE id = ${id}`, function (err, result){
		if (err){callback(null, err);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Notification.prototype.getUnread = function (user_id, callback) {
	db.query(`SELECT COUNT id FROM notifications WHERE user_id = ${user_id} AND viewed = '0'`, function (err, result){
		if (err){callback(null, err);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

module.export = Notification;