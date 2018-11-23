'user strict';
var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");
var mysql = require('mysql');

var User = function (data) {
    this.data = this.clean(data);
}

User.prototype.data = {}

User.prototype.get = function (name) {
    return this.data[name];
}

User.prototype.set = function (name, value) {
    this.data[name] = value;
}

User.prototype.clean = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

User.prototype.deleteById = function (id) {
    id = mysql.escape(id);
    var self = this;
    if (id)
        tmp_id = id;
    else
        tmp_id = self.data['id'];
    db.query(`DELETE FROM users WHERE id = ${tmp_id}`, function (err){
        if (err) 
                throw(err)
            else{
                self.data = null;
                console.log("Deleted user");
            }
    })
    
}

User.prototype.save = function (callback) {
    var self = this;
    this.data = this.clean(this.data);
    tmp = [this.data['first_name'], this.data['last_name'], this.data['user_name'], this.data['email'], this.data['password'], this.data['last_name']];
    id = this.data['id'];
    db.query(`UPDATE users SET first_name = ?, last_name = ?, user_name = ?, email = ?, password = ? WHERE id = ${id}`, tmp, function (err, result, rows){
        if (err) throw(err)
        if (typeof callback === "function"){
            callback();
        }
        else{
            console.log("Saved updated user");
        }
    })
}

User.prototype.runQuery = function (query, callback){
    var self = this;
    db.query(query, function (err, result, rows) {
        if (err) throw(err)
        row = result[0];
        console.log(query, result);
        self.data = {
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            user_name: row.user_name,
            email: row.email,
            password: row.password
        }
        if (typeof callback === "function"){
            callback(self);
        }
        else {
            console.log("User updated", self);
            return (self);
        }
    });
}

User.prototype.getById = function (data, callback) {
    data = mysql.escape(data);
    var query = `SELECT * FROM users WHERE id = '${data}'`;
    this.runQuery(query, callback);
}

User.prototype.getByUsername = function (data, callback) {
    data = mysql.escape(data);
    var query = `SELECT * FROM users WHERE user_name = '${data}'`;
    this.runQuery(query, callback);
}

User.prototype.getByEmail = function (data, callback) {
    data = mysql.escape(data);
    var query = `SELECT * FROM users WHERE email = '${data}'`;
    this.runQuery(query, callback);
}

module.exports = User;