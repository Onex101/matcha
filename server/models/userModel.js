'user strict';
var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");
var mysql = require('mysql');

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

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

User.prototype.deleteById = function (id, callback) {
    id = mysql.escape(id);
    var self = this;
    if (id)
        tmp_id = id;
    else
        tmp_id = self.data['id'];
    db.query(`DELETE FROM users WHERE id = ${tmp_id}`, function (err, result){
        if (err){callback(null, err);}
        else{
            if (typeof callback === "function"){
                callback(null, result);
            }
        }
    })
    
}

User.prototype.getById = function (data, callback) {
    var self = this;
    data = mysql.escape(data);
    var query = `SELECT * FROM users WHERE id = ${data}`;
    db.query(query, function (err, result) {
        if (err) {callback(err, null);}
        // console.log(query, result);
        else{
            (typeof callback === "function")
                // console.log("User updated", self);
                callback(null, result);
        }
    });
}

User.prototype.getByUsername = function (data, callback) {
    var self = this;
    data = mysql.escape(data);
    var query = `SELECT * FROM users WHERE user_name = '${data}'`;
    db.query(query, function (err, result) {
        if (err) {callback(err, null);}
        // console.log(query, result);
        else{
            if (typeof callback === "function"){
                // console.log("User updated", self);
                callback(null, result);
            }
        }
    });
}

User.prototype.update = function (callback) {
    // var self = this;
    for (var key in this.data) {
        if (this.data.hasOwnProperty(key)) {
            key = mysql.escape(key);
        }
    }
    this.data = this.clean(this.data);
    tmp = [this.data['first_name'], 
            this.data['last_name'], 
            this.data['user_name'], 
            this.data['email'], 
            this.data['password'], 
            this.data['last_name']];
    id = this.data['id'];
    db.query(`UPDATE 
               users 
            SET 
                first_name = ?,
                last_name = ?, 
                user_name = ?, 
                email = ?, 
                password = ? 
            WHERE
                id = ${id}`, tmp, function (err, result, rows){
        if (err){callback(null, err);}
        else{
            if (typeof callback === "function"){
                callback(null, result);
            }
        }
    })
}

User.prototype.save = function (callback) {
    var self = this;
    // console.log(this.data);

    // this.data = mysql.escape(this.data);
    for (var key in this.data) {
        if (this.data.hasOwnProperty(key)) {
            if (key != null)
                key = mysql.escape(key);
        }
    }
    this.data = this.clean(this.data);
    console.log("Tryin to save");
    console.log(this.data);
    db.query(`INSERT 
               users 
            ( 
                first_name,
                last_name, 
                user_name, 
                email, 
                password
            )
            VALUES
            (
                '${this.data['first_name']}',
                '${this.data['last_name']}',
                '${this.data['user_name']}',
                '${this.data['email']}',
                '${this.data['password']}'
            )`, function (err, result){
                    if (typeof callback === "function"){
                        if (err){
                            callback(err, null);
                        }
                        else{
                            self.data['id'] = result.insertId;
                            callback(null, result);
                        }
                    }
    })
}

User.prototype.getAll = function (callback){
    db.query(SELECT_ALL_USERS_QUERY, (err, result) => {
        if (err) {
            callback(err, null);
            throw(err);
        }
        else {
            callback(null, result);
        }
    });
}

User.prototype.login = function (callback){
    this.getByUsername(this.data.user_name, function(err, results){
        if (err)
            callback(null, err);
        else
            callback(null, results);
    })
}

// User.prototype.runQuery = function (query, callback){
//     var self = this;
//     db.query(query, function (err, result, rows) {
//         if (err) {callback(null, err);}
//         // console.log(query, result);
//         else{
//             row = result[0];
//             self.data = {
//                 id: row.id,
//                 first_name: row.first_name,
//                 last_name: row.last_name,
//                 user_name: row.user_name,
//                 email: row.email,
//                 password: row.password
//             }
//             if (typeof callback === "function"){
//                 // console.log("User updated", self);
//                 callback(null, result);
//             }
//         }
//     });
// }

// User.prototype.getByUsername = function (data, callback) {
//     data = mysql.escape(data);
//     var query = `SELECT * FROM users WHERE user_name = '${data}'`;
//     this.runQuery(query, callback);
// }

// User.prototype.getByEmail = function (data, callback) {
//     data = mysql.escape(data);
//     var query = `SELECT * FROM users WHERE email = '${data}'`;
//     this.runQuery(query, callback);
// }

module.exports = User;