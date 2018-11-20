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

User.prototype.save = function (callback) {
    var self = this;
    this.data = this.clean(this.data);
    db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
        if (err) return callback(err);
        callback(null, result); 
    });
}

User.prototype.findById = function (id, callback) {
    // var newUser;
    // return new Promise((resolve, reject) => {
    //     db.query('SELECT * FROM users WHERE id = ?', id, function (err, result, rows) {
    //         // if (err) throw (err);
    //         if (err) { return reject(err) }
    //         row = result[0];
    //         tmp = {
    //             first_name: row.first_name,
    //             last_name: row.last_name,
    //             user_name: row.user_name,
    //             email: row.email,
    //             password: row.password
    //         }
    //         newUser = new User(tmp);
    //         // console.log("Try it: ", newUser);
    //         return resolve(newUser)
    //     });
    // })
    query = 'SELECT * FROM users WHERE id = ?';
    info = id;
    db.runQuery(query, info, callback);
}

module.exports = User;