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

User.prototype.save = function () {
    var self = this;
    this.data = this.clean(this.data);
    console.log(this.data);
    tmp = [this.data['first_name'], this.data['last_name'], this.data['user_name'], this.data['email'], this.data['password'], this.data['last_name']];
    console.log(tmp);
    id = this.data['id'];
    db.query(`UPDATE users SET first_name = ?, last_name = ?, user_name = ?, email = ?, password = ? WHERE id = ${id}`, tmp, function (err, result, rows){
        if (err) throw(err)
        console.log("Saved updated user");
    })
}

User.prototype.search = function (id, name) {
    var self = this;
    // return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE ${name} = ?`, id, function (err, result, rows) {
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
        console.log("Try it: ", self);
        return (self)
    });
    // })
    // query = 'SELECT * FROM users WHERE id = ?';
    // info = id;
    // db.runQuery(query, info, callback);
}

module.exports = User;