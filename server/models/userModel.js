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
    // console.log("Tryin to save");
    // console.log(this.data);
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

User.prototype.match = function (callback){
        connection.query("SELECT username, age, gender, pref, gps_lat, gps_lon, likes, fame FROM people WHERE username ="+quser, function (err, user0) {
            if (err) { return reject(err) }
        var array =[];
        
        var i = 0;
        while(results[i]){
            dist = getD_coff(user0[0].gps_lat, user0[0].gps_lon, results[i].gps_lat, results[i].gps_lon)
            dist_raw = getDistance(user0[0].gps_lat, user0[0].gps_lon, results[i].gps_lat, results[i].gps_lon)
            age = getA_coff(user0[0].age, results[i].age)
            pref = getP_coff(user0[0].gender, user0[0].pref, results[i].gender, results[i].pref)
            like = getL_coff(user0[0].likes, results[i].likes)
            var match =  (dist) +  (age) +  (5*pref) + (like)
            var user = results[i].username
            if(match > 4){
            array.push([user,match,results[i].fame,like*100, dist_raw,(Math.abs(user0[0].age - results[i].age))])}
            i++;
        }
      resolve (array) 
      },
        if (err)
            callback(null, err);
        else
            callback(null, results);
}

module.exports = User;