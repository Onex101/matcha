var db = require("../db.js");
var schemas = require("../schemas.js");
var mysql = require('mysql');
var _ = require("lodash");

var Msg = function (data) {
	this.data = this.clean(data);
}

Msg.prototype.data = {}

Msg.prototype.clean = function (data) {
	data = data || {};
	var schema = schemas.message;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

Msg.prototype.getByConversationId = function (conversation_id, callback) {
	db.query(`SELECT msgs.id, conversation_id, user_name AS sender, msgs.msg, timestamp, viewed FROM msgs LEFT JOIN users ON msgs.sender = users.id WHERE conversation_id = '${conversation_id}'`, function (err, result){
		if (err){
			callback(err, null);
		}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Msg.prototype.getByMessagesByUserNames = function (user_name1, user_name2, callback){
	var query =  `SELECT * FROM msgs WHERE conversation_id = (SELECT id FROM conversations WHERE (user1 = '${user_name1}' AND user2 = '${user_name2}') OR (user1 = '${user_name2}' AND user2 = '${user_name1}'))`
	db.query(query, function(err,result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Msg.prototype.getByMessagesByUserIds = function (user_id1, user_id2, callback){
	var old_query =  `SELECT * FROM msgs WHERE conversation_id = (SELECT id FROM conversations WHERE (user1 = '${user_id1}' AND user2 = '${user_id2}') OR (user1 = '${user_id2}' AND user2 = '${user_id1}'))`
	var query = `SELECT msgs.id, conversation_id, user_name AS sender, msgs.msg, timestamp, viewed FROM msgs LEFT JOIN users ON msgs.sender = users.id WHERE conversation_id = (SELECT id FROM conversations WHERE (user1 = '${user_id1}' AND user2 = '${user_id2}') OR (user1 = '${user_id2}' AND user2 = '${user_id1}'))`
	db.query(query, function(err,result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Msg.prototype.create = function (callback) {
	msg = mysql.escape(this.data.message);
	db.query(`INSERT msgs (conversation_id, sender, msg) VALUES ('${this.data.conversation_id}', '${this.data.sender}', ${msg})`, function (err, result){
		if (err){callback(err, null);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

module.exports = Msg;