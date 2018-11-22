'user strict';
var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");

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

User.prototype.delete = function (id) {
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
    console.log(this.data);
    tmp = [this.data['first_name'], this.data['last_name'], this.data['user_name'], this.data['email'], this.data['password'], this.data['last_name']];
    console.log(tmp);
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

User.prototype.search = function (id, column, callback) {
    var self = this;
    // return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE ${column} = ?`, id, function (err, result, rows) {
        // if (err) throw (err);
        if (err) throw(err)
        row = result[0];
        // console.log(self);
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
            console.log("Try it: ", self);
            return (self);
        }
    });
    // })
    // query = 'SELECT * FROM users WHERE id = ?';
    // info = id;
    // db.runQuery(query, info, callback);
}

module.exports = User;