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
	db.query(`INSERT conversations (user1, user2) VALUES('${user1}', '${user2}')`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Conversation.prototype.getByUsers = function (user1, user2, callback) {
	self = this;
	db.query(`SELECT * FROM conversations WHERE (user1 = '${user1}' AND user2 = '${user2}') OR (user1 = '${user2}' AND user2 = '${user1}')`, function (err, result){
		if (err){
			callback(err, null);
		}
		else{
			if (!result.length)
				self.create(user1, user2, function (err, result){
					if (err){
						callback(err, null);
					}
					else{
						callback(null, result);
					}
				})
			else if (typeof callback === "function"){
				// console.log(result)
				callback(null, result);
			}
		}
	})
}

Conversation.prototype.getConversationId = function(user1, user2, callback) {
	var query = `SELECT id FROM conversations WHERE (user1 = '${user1}' AND user2 = '${user2}') OR (user1 = '${user2}' AND user2 =' ${user1}') LIMIT 1`;
	db.query(query, function(err, result){
		if (err){callback(err, null);}
		else{
			callback(null, result);
		}
	})
}

module.exports = Conversation;