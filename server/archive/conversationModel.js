var db = require("../db.js");
var schemas = require("../schemas.js");
var mysql = require('mysql');
var _ = require("lodash");

var Conversation = function (data) {
	this.data = this.clean(data);
}

Conversation.prototype.data = {}

Conversation.prototype.clean = function (data) {
	data = data || {};
	var schema = schemas.conversation;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Conversation.prototype.create = function (user1, user2, callback) {
	db.query(`INSERT conversation (user1, user2) VALUES(${user1}, ${user2})`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Conversation.prototype.getByUsers = function (user1, user2, callback) {
	db.query(`SELECT conversation FROM conversations WHERE (user1 = ${user1} AND user2 = ${user2}) OR (user1_id = ${id2} AND user2_id = ${id1})`, function (err, result){
		if (err){
			callback(err, null);
		}
		else{
			if (!results.length)
				Conversation.create(user1, user2, function (err, result){
					if (err){
						callback(err, null);
					}
					else{
						callback(null, result);
					}
				})
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

module.exports = Conversation;