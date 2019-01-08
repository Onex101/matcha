'use strict';
var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");
var mysql = require('mysql');
var mail = require('../mail.js');

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
	var schema = schemas.user;
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
    var query = `SELECT * FROM users WHERE id = ${data}`;
    db.query(query, function (err, result) {
        if (err) {callback(err, null);}
        else{
			// this.getInterestsById(this.data.id, function (err, res){
			// 	if (err){
			// 		callback(err, null);
			// 	}
			// 	else{
			// 		if (typeof callback === "function")
			// 		var interests = [];
			// 		i = 0;
			// 		while (res[i]){
			// 			interests.push(res[i]);
			// 			i++;
			// 		}
			// 		result[0].interests = interests;
			// 		// console.log("User updated", self);
			// 		callback(null, result);
			// 	}
			callback(null, result); 
			// });
        }
    });
}

User.prototype.getByUsername = function (data, callback) {
    var self = this;
    data = mysql.escape(data);
    var query = `SELECT * FROM users WHERE user_name = ${data}`;
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

//Retrieves a list interests of a given users user_id
User.prototype.getInterestsById = function (data, callback) {
	var self = this;
	data = mysql.escape(data);
	var query = `SELECT interest FROM interests JOIN user_interests ON interests.id=user_interests.interest_id WHERE user_id = ${data}`;
	db.query(query, function (err, result) {
		if (err) {callback(err, null);}
		else{
			if (typeof callback === "function"){
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
    console.log(this.data ['verified']);
    var tmp = [this.data['first_name'], 
            this.data['last_name'], 
            this.data['user_name'],
            this.data['birth_date'],
            this.data['gender'],
            this.data['pref'],
            this.data['gps_lat'],
            this.data['gps_lon'],
            this.data['bio'],
            this.data['fame'],
            this.data['email'], 
			this.data['password'],
			this.data['veri_code'],
			this.data ['verified']]
    var id = this.data['id'];
    db.query(`UPDATE 
               users 
            SET 
                first_name = ?,
                last_name = ?, 
                user_name = ?,
                birth_date = ?,
                gender = ?,
                pref = ?,
                gps_lat = ?,
                gps_lon = ?,
                bio = ?,
                fame = ?,
                email = ?, 
				password = ?,
				veri_code = ?,
				verified = ?
            WHERE
                id = ${id}`, tmp, function (err, result, rows){
        if (err){
            throw err
            callback(err, null);
        }
        else{
            if (typeof callback === "function"){
                // console.log(result);
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
                birth_date,
                gender,
                pref,
                gps_lat,
                gps_lon,
                bio,
                fame,
                email, 
				password,
				veri_code,
				verified
            )
            VALUES
            (
                '${this.data['first_name']}',
                '${this.data['last_name']}',
                '${this.data['user_name']}',
                '${this.data['birth_date']}',
                '${this.data['gender']}',
                '${this.data['pref']}',
                '${this.data['gps_lat']}',
                '${this.data['gps_lon']}',
                '${this.data['bio']}',
                '${this.data['fame']}',
                '${this.data['email']}',
				'${this.data['password']}',
				'${this.data['veri_code']}',
				'${this.data['verified']}'
            )`, function (err, result){
                    if (typeof callback === "function"){
                        if (err){
							throw err;
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
            callback(err, null);
        else
            callback(null, results);
    })
}

User.prototype.match = function (callback){
    let data = this.data;
    db.query(`SELECT id, user_name, birth_date, gender, pref, gps_lat, gps_lon, bio FROM users WHERE NOT id = ${this.data.id}`, function (err, results) {
        if (err){
            callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.exists = function (callback){
    console.log(this.data);
	db.query(`SELECT user_name, email FROM users WHERE user_name = '${this.data.user_name}' OR email = '${this.data.email}'`, function (err, results) {
		if (err){
			throw err;
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

module.exports = User;