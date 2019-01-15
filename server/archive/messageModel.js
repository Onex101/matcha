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
	db.query(`SELECT msg FROM msgs WHERE conversation_id = ${conversation_id})`, function (err, result){
		if (err){
			callback(null, err);
		}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

Msg.prototype.create = function (callback) {
	db.query(`INSERT INTO msgs VALUES (${this.conversation_id}, ${this.sender}, ${this.msg})`, function (err, result){
		if (err){callback(null, err);}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

module.exports = Msg;