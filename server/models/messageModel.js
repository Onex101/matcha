var db = require("../db.js");
var schemas = require("../schemas.js");
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

Msg.prototype.sendMsg = function (user1_id, user2_id, msg, callback) {
	db.query(`INSERT INTO msgs(user1_id, user2_id, msg, timestamp) VALUES (${user1_id}, ${user2_id},${msg}, Date())`, function (err, result){
		if (err){callback(err, null);}
		else{
            callback(null, result);
		}
	})
}

Msg.prototype.getConv = function (user1, user2, callback) {
	db.query(`SELECT * FROM msgs WHERE (user1_id = ${user1} AND user2_id = ${user2}) OR (user2_id = ${user1} AND user1_id = ${user2})`, function (err, result){
		if (err){callback(err, null);}
		else{
			callback(null, result);
		}
	})
}

module.exports = Msg;