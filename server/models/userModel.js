'use strict';
var db = require("../db.js");
var schemas = require("../schemas.js");
var _ = require("lodash");
var mysql = require('mysql');
var mail = require('../mail.js');
var match = require('../matchFunctions.js');

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
		var tmp_id = id;
	else
		var tmp_id = self.data['id'];
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
	var query = 
	`SELECT
		id, password,user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, profile_pic_id, pic, fame, GROUP_CONCAT(interest) AS interests
	FROM
		(SELECT
			users.id, user_name, first_name, last_name, password,interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, profile_pic_id, 
				(SELECT
					COUNT(user1_id) FROM likes WHERE (user1_id = ${data} OR user2_id = ${data}) AND link_code = 1) as fame, pic
				FROM
					user_interests
		RIGHT JOIN
			users ON user_interests.user_id = users.id
		LEFT JOIN
			interests ON user_interests.interest_id = interests.id
		LEFT JOIN
			pictures ON profile_pic_id = pictures.id) x
		WHERE
			id = ${data}
		GROUP BY
			user_name, id`;

    db.query(query, function (err, result) {
		if (err) {callback(err, null);}
		else{
			callback(null, result); 
		}
    });
}

User.prototype.linked_users = function(id, callback){
	var query = `SELECT users.*, pictures.pic FROM users INNER JOIN (SELECT user1_id AS id FROM likes WHERE user2_id = ${id} AND link_code = 1
		UNION SELECT user2_id FROM likes WHERE user1_id = ${id} AND link_code = 1) AS lst ON lst.id = users.id INNER JOIN pictures ON users.profile_pic_id = pictures.id`;
	db.query(query, function(err,result){
		if (err) {callback(err, null);}
        else{
			callback(null, result); 
        }
	})
}

User.prototype.getUsersThatLikeCurrentUser = function(id, callback){
	var query = `SELECT users.*, pictures.pic FROM users JOIN (SELECT user1_id AS id FROM likes WHERE user2_id = ${id} AND link_code = 1) AS lst ON lst.id = users.id INNER JOIN pictures ON users.profile_pic_id = pictures.id`;
	db.query(query, function(err,result){
		if (err) {callback(err, null);}
        else{
			callback(null, result); 
        }
	})
}

User.prototype.getByUsername = function (data, callback) {
    data = mysql.escape(data);
	var query = 
	`SELECT
		id, password, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon,bio, profile_pic_id, pic, fame, veri_code, GROUP_CONCAT(interest) AS interests
	FROM
		(SELECT
			users.id, user_name, first_name, last_name, password,interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, profile_pic_id, fame, pic, veri_code
		FROM
			user_interests
		RIGHT JOIN
			users ON user_interests.user_id = users.id
		LEFT JOIN
			interests ON user_interests.interest_id = interests.id
		LEFT JOIN
			pictures ON profile_pic_id = pictures.id) x
	WHERE
		user_name = ${data}
	GROUP BY
		user_name, id`;

    db.query(query, function (err, result) {
        if (err) {callback(err, null);}
        else{
            if (typeof callback === "function"){
                callback(null, result);
            }
        }
    });
}

//Retrieves a list interests of a given users user_id
User.prototype.getInterestsById = function (id, callback) {
	id = mysql.escape(id);
	var query =
	`SELECT
		interest
	FROM
		interests
	JOIN
		user_interests ON interests.id=user_interests.interest_id
	WHERE
		user_id = ${id}`;

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
	for (var key in this.data) {
		if (this.data.hasOwnProperty(key)) {
			key = mysql.escape(key);
		}
	}
	this.data = this.clean(this.data);
	//console.log(this.data ['verified']);
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
			callback(err, null);
		}
		else{
			if (typeof callback === "function"){
				callback(null, result);
			}
		}
	})
}

User.prototype.save = function (callback) {
    var self = this;
    for (var key in this.data) {
        if (this.data.hasOwnProperty(key)) {
            if (key != null)
                key = mysql.escape(key);
        }
    }
    this.data = this.clean(this.data);
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
        }
        else {
            callback(null, result);
        }
    });
}

User.prototype.login = function (callback){
	let self = this
    this.getByUsername(this.data.user_name, function(err, results){
        if (err)
            callback(err, null);
        else{
			let newUser = new User('')
            newUser.login_user(self.data.user_name, function(err, result){
				if(err){callback(err,null);}
				else{
					callback(null, results);
				}
			});
			callback(null, results);
		}
    })
}

User.prototype.update_pass = function(user_name, veri_code, password, callback){
	var query = `UPDATE users SET password = '${password}' WHERE user_name = '${user_name}' AND veri_code = '${veri_code}'`;
	db.query(query, function(err, result){
		if(err){callback(err,null);}
		else{callback(null, result);}
	})
}

User.prototype.login_user = function (user_name, callback){
	var query = `UPDATE users SET online = NULL WHERE user_name = '${user_name}'`;
	db.query(query, function(err, result){
		if(err){callback(err,null);}
	})
}

User.prototype.like = function (user_id, target_id, callback){
	var query = `SELECT count(*) AS count FROM likes WHERE (user1_id = ${user_id} AND user2_id = ${target_id}) OR (user2_id = ${user_id} AND user1_id = ${target_id})`;
	db.query(query, function(err, results){
		if(err){callback(err,null);}
		else{
			if (results[0].count > 0){
				var query = `UPDATE likes SET link_code = 1 WHERE (user1_id = ${user_id} AND user2_id = ${target_id}) OR (user2_id = ${user_id} AND user1_id = ${target_id})`
				db.query(query, function(err, result){
					if(err){callback(err,null);}
					else{
						var query = `UPDATE users SET fame = ((SELECT COUNT(link_code) FROM likes WHERE link_code = 0 AND user2_id = ${target_id}) + (SELECT COUNT(link_code) FROM likes WHERE link_code = 1 AND user1_id = ${target_id})) WHERE id = ${target_id}`;
						db.query(query, function(err, result){
							if(err){callback(err,null);}
							else{callback(null, result);}
						})
					}
				})
			}
			else{
				var query = `INSERT INTO likes VALUES(${user_id},${target_id}, 0)`;
				db.query(query, function(err, result){
					if(err){callback(err,null);}
					else{
						var query = `UPDATE users SET fame = ((SELECT COUNT(link_code) FROM likes WHERE link_code = 0 AND user2_id = ${target_id}) + (SELECT COUNT(link_code) FROM likes WHERE link_code = 1 AND user1_id = ${target_id})) WHERE id = ${target_id}`;
						db.query(query, function(err, result){
							if(err){callback(err,null);}
							else{callback(null, result);}
						})
					}
				})
			}
		}
	})
}

User.prototype.dislike = function (user_id, target_id, callback){
	var query = `SELECT count(*) AS count FROM likes WHERE (user1_id = ${user_id} AND user2_id = ${target_id}) OR (user2_id = ${user_id} AND user1_id = ${target_id})`;
	db.query(query, function(err, results){
		if(err){callback(err,null);}
		else{
			if (results[0].count > 0){
				var query = `UPDATE likes SET link_code = 2 WHERE (user1_id = ${user_id} AND user2_id = ${target_id}) OR (user2_id = ${user_id} AND user1_id = ${target_id})`
				db.query(query, function(err, result){
					if(err){callback(err,null);}
					else{
						var query = `UPDATE users SET fame = ((SELECT COUNT(link_code) FROM likes WHERE link_code = 0 AND user2_id = ${target_id}) + (SELECT COUNT(link_code) FROM likes WHERE link_code = 1 AND user1_id = ${target_id})) WHERE id = ${target_id}`;
						db.query(query, function(err, result){
							if(err){callback(err,null);}
							else{callback(null, result);}
						})
					}
				})
			}
			else{
				var query = `INSERT INTO likes VALUES(${user_id},${target_id},2)`;
				db.query(query, function(err, result){
					if(err){callback(err,null);}
					else{
						var query = `UPDATE users SET fame = ((SELECT COUNT(link_code) FROM likes WHERE link_code = 0 AND user2_id = ${target_id}) + (SELECT COUNT(link_code) FROM likes WHERE link_code = 1 AND user1_id = ${target_id})) WHERE id = ${target_id}`;
						db.query(query, function(err, result){
							if(err){callback(err,null);}
							else{callback(null, result);}
						})
					}
				})
			}
		}
	})
}

User.prototype.match = function (id, callback){
	var query = 
	`SELECT
		id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, GROUP_CONCAT(interest) AS interests
	FROM
		(SELECT
			users.id, user_name, first_name, last_name, interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, pic, fame, verified, profile_pic_id
		FROM
			user_interests
		RIGHT JOIN
			users ON user_interests.user_id = users.id
		LEFT JOIN
			interests ON user_interests.interest_id = interests.id
		LEFT JOIN
			pictures ON profile_pic_id = pictures.id
		WHERE
			verified IS NOT NULL AND pic IS NOT NULL) x
	WHERE NOT
		id = ${id} AND id NOT IN 
			(SELECT
				user2_id
			FROM
				likes
			WHERE
				user1_id = ${id}
			UNION
			SELECT
				user1_id
			FROM
				likes
			WHERE
				user2_id = ${id} AND (link_code = 1 OR link_code = 2))
	GROUP BY
		user_name, id
	ORDER BY
		id`;
	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.user_search = function(id, search_name, callback){
	var query =
	`SELECT
		id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, GROUP_CONCAT(interest) AS interests
	FROM
		(SELECT
			users.id, user_name, first_name, last_name, interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, pic, fame, verified, profile_pic_id
		FROM
			user_interests
		RIGHT JOIN
			users ON user_interests.user_id = users.id
		LEFT JOIN
			interests ON user_interests.interest_id = interests.id
		LEFT JOIN
			likes ON users.id = user2_id
		LEFT JOIN
			pictures ON profile_pic_id = pictures.id
		WHERE
			verified IS NOT NULL AND pic IS NOT NULL) x
	WHERE
		user_name LIKE "%${search_name}%" AND NOT id = ${id}
	GROUP BY
		user_name, id
	ORDER BY
		id`;
	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.tag_search = function(id, interest, callback){
	var query = 
	`SELECT 
		id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, interests 
	FROM 
		(SELECT 
			id, user_name, birth_date, first_name, last_name, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, GROUP_CONCAT(interest) AS interests
				FROM
					(SELECT 
						users.id, user_name, first_name, last_name, interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, pic, fame, verified, profile_pic_id FROM user_interests
					RIGHT JOIN
						users ON user_interests.user_id = users.id
					LEFT JOIN
						interests ON user_interests.interest_id = interests.id
					LEFT JOIN
						likes ON users.id = user2_id
					LEFT JOIN
						pictures ON profile_pic_id = pictures.id
					WHERE
						verified IS NOT NULL AND pic IS NOT NULL) x
				WHERE
					NOT id = ${id}
				GROUP BY
					user_name, id
				ORDER BY
					id) y
	WHERE id IN (SELECT user_id FROM user_interests JOIN interests ON interest_id = id WHERE interest = "${interest}")`;
	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.getMaxAgeGapMatch = function(id, x, callback){
	var query = 
	`SELECT 
		id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, fame, profile_pic_id, interests 
	FROM 
		(SELECT 
			id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, GROUP_CONCAT(interest) AS interests
				FROM
					(SELECT 
						users.id, user_name, first_name, last_name, interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, pic, fame, verified, profile_pic_id
					FROM
						user_interests
					RIGHT JOIN
						users ON user_interests.user_id = users.id
					LEFT JOIN
						interests ON user_interests.interest_id = interests.id
					LEFT JOIN
						likes ON users.id = user2_id
					LEFT JOIN
						pictures ON profile_pic_id = pictures.id
					WHERE
						verified IS NOT NULL AND pic IS NOT NULL) x
				WHERE
					NOT id = ${id}
				GROUP BY
					user_name, id
				ORDER BY
					id) y
	WHERE id IN
		(SELECT
			id FROM users
		WHERE
			ABS(FLOOR(DATEDIFF(NOW(),birth_date)/365) - (
				SELECT
					FLOOR(DATEDIFF(NOW(),birth_date)/365)
				FROM
					users
				WHERE
					id = ${id})
			) < ${x})`;
	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.search_fame = function(x, id, callback){
	var query = 
	`SELECT
		id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, GROUP_CONCAT(interest) AS interests
	FROM
		(SELECT
			users.id, user_name, first_name, last_name, interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, pic, fame, verified, profile_pic_id
		FROM
			user_interests
		RIGHT JOIN
			users ON user_interests.user_id = users.id
		LEFT JOIN
			interests ON user_interests.interest_id = interests.id
		LEFT JOIN
			likes ON users.id = user2_id
		LEFT JOIN
			pictures ON profile_pic_id = pictures.id
		WHERE
			likes.link_code IS NULL AND verified IS NOT NULL AND pic IS NOT NULL AND fame >= ${x}) x
	WHERE
		NOT id = ${id}
	GROUP BY
		user_name, id
	ORDER BY
		id`
	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}


User.prototype.linked = function(id,callback){
	var query =
	`SELECT
		id, user_name, first_name, last_name, birth_date, gender, pref, gps_lat, gps_lon, bio, pic, fame, profile_pic_id, GROUP_CONCAT(interest) AS interests
	FROM
		(SELECT
			users.id, user_name, first_name, last_name, interest, birth_date, gender, pref, users.gps_lat, users.gps_lon, bio, pic, fame, verified, profile_pic_id
		FROM
			user_interests
		RIGHT JOIN
			users ON user_interests.user_id = users.id
		LEFT JOIN
			interests ON user_interests.interest_id = interests.id
		LEFT JOIN
			likes ON users.id = user2_id
		LEFT JOIN
			pictures ON profile_pic_id = pictures.id
		WHERE
			likes.link_code = 1 AND verified IS NOT NULL AND pic IS NOT NULL) x
	WHERE
		NOT id = ${id}
	GROUP BY
		user_name, id
	ORDER BY
		id`;
	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.exists = function (callback){
	var query = 
	`SELECT
		user_name, email
	FROM
		users
	WHERE
		user_name = '${this.data.user_name}' OR email = '${this.data.email}'`

	db.query(query, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.getMatchDetails = function(user_id, match_id, callback){
	var query =
	`SELECT
		user_name, first_name, last_name, fame, birth_date, gps_lat, gps_lon, COUNT(*) AS visits
	FROM
		users
	JOIN
		history ON id = viewed_id
	WHERE
		viewed_id = ${match_id}
	GROUP BY
		user_name, first_name, last_name, fame, birth_date, gps_lat, gps_lon;`;

	db.query(query, function(err, results){
		if (err){
			callback(err, null);
		}
		else{
			if(results.length){
				var age = match.getAge(results[0].birth_date);
				let user = new User('');
				user.getById(user_id, function (err, result){
					if (err){callback(err, null);}
					else{
						var dist = match.getDistance(results[0].gps_lat, results[0].gps_lon,result[0].gps_lat, result[0].gps_lon);
						var final_query = `SELECT user_name, first_name, last_name, fame, ${age} AS age, ${dist} as distance, COUNT(*) AS visits, gps_lat, gps_lon FROM users JOIN history ON id = viewed_id WHERE viewed_id = ${match_id} GROUP BY user_name, fame, birth_date, gps_lat, gps_lon;`;
						db.query(final_query, function (err, fresults) {
							if (err){
								callback(err, null);
							}
							else{
								callback(null, fresults);
							}
						})
					}
				})
			}
			else{
				callback("This Error", null)
			}
		}
	})
}

User.prototype.getUserDetails = function(id, callback){
	var query = 
	`SELECT
		user_name, first_name, last_name, fame, birth_date, gender, pref, COUNT(*) AS visits, FLOOR(DATEDIFF(NOW(),birth_date)/365) AS age
	FROM
		users
	JOIN
		history ON id = viewed_id 
	WHERE
		viewed_id = ${id} 
	GROUP BY
		user_name, first_name, last_name, fame, birth_date, gps_lat, gps_lon, gender, pref`;

	db.query(query,function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.getEmailById = function (callback){
	db.query(`SELECT email FROM users WHERE id = '${this.data.id}'`, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.getEmailByUserName = function (callback){
	db.query(`SELECT email FROM users WHERE user_name = '${this.data.user_name}'`, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.setInterestByIds = function (user_id, interest_id, callback){
	var query = `INSERT INTO user_interests VALUES(${user_id},${interest_id})`;
	db.query(query , function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.getInterestById = function (user_id, callback){
	var query = 
	`SELECT
		id, interest AS name
	FROM
		user_interests
	JOIN
		interests ON user_interests.interest_id = interests.id 
	WHERE
		user_id = ${user_id}`;

	db.query(query , function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.replaceInterest = function (user_id, interest_id_old, interest_id_new, callback){
	var query1 = `DELETE FROM user_interests WHERE user_id = ${user_id} AND interest_id = ${interest_id_old}`;
	db.query(query1 , function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			var query2 = `INSERT INTO user_interests VALUES(${user_id},${interest_id_new})`;
			db.query(query2 , function (err, results) {
				if (err){
					callback(err, null);
				}
				else{
					callback(null, results);
				}
			})
		}
	})
}

User.prototype.setInterestByName = function(user_id, interest, callback){
	let user = new User('');
	var query = `SELECT id FROM interests WHERE interest = '${interest}'`;
	db.query(query , function (err, interest_id) {
		if (err){
			callback(err, null);
		}
		else{
			if(interest_id.length){
				user.setInterestByIds(user_id, interest_id[0].id, function(err, results1) {
					if (err){
						callback(err, null);
					}
					else{
						callback(null, results1);
					}
				});
			}
			else{
				user.createNewInterest(user_id, interest , function(err, results2) {
					if (err){
						callback(err, null);
					}
					else{
						callback(null, results2);
					}
				});
			}
		}
	})
}

User.prototype.createNewInterest = function (user_id, interest, callback){
	interest = mysql.escape(interest);
	var query1 = `INSERT INTO interests (interest) VALUES (${interest});`;
	db.query(query1 , function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			var query2 = `INSERT INTO user_interests VALUES(${user_id},(SELECT id FROM interests WHERE interest = ${interest} LIMIT 1))`;
			db.query(query2 , function (err, results) {
				if (err){
					callback(err, null);
				}
				else{
					callback(null, results);
				}
			})
		}
	})
}

User.prototype.removeInterestByUserId = function (user_id, interest, callback){
	var query = `DELETE user_interests FROM user_interests JOIN interests ON user_interests.interest_id = interests.id WHERE user_id = ${user_id} AND interests.interest = '${interest}';`;
	db.query(query , function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.fetchInterestsList = function (callback){
	var query = `SELECT id, interest AS name FROM interests`;
	db.query(query , function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.update_data = function (bio, gender, pref, id, callback){
	bio = mysql.escape(bio);
	var query = `UPDATE users SET bio = ${bio}, gender = '${gender}', pref = '${pref}' WHERE id = '${id}'`;
	db.query(query, function (err, results) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.set_gps = function(id, lat, lon, callback){
	var query = `UPDATE users SET gps_lat = ${lat}, gps_lon = ${lon} WHERE id = ${id}`;
	db.query(query, function(err, results){
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.addVisit = function(viewer_id, viewee_id, callback){
	var query = `INSERT INTO history (viewer_id, viewed_id) VALUES (${viewer_id}, ${viewee_id})`;
	db.query(query, function(err, results){
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.getVisits = function(id, callback){
	// var query = `SELECT user_name, timestamp FROM history LEFT JOIN users ON viewer_id = id WHERE viewed_id = ${id} AND NOT viewer_id = ${id}`;
	// var query = `SELECT DISTINCT viewer_id, user_name, timestamp, pictures.pic FROM history LEFT JOIN users ON viewer_id = users.id LEFT JOIN pictures ON pictures.id = users.profile_pic_id WHERE viewed_id = ${id} AND NOT viewer_id = ${id};`;
	var query = `SELECT DISTINCT users.* , timestamp, pictures.pic FROM history LEFT JOIN users ON viewer_id = users.id LEFT JOIN pictures ON pictures.id = users.profile_pic_id WHERE viewed_id = ${id} AND NOT viewer_id = ${id}`;
	// var query = `SELECT users.*, pictures.pic FROM users INNER JOIN (SELECT user1_id `/
	// + `AS id FROM likes WHERE user2_id = ${id} AND link_code = 1 ` /
	// 	+ `UNION SELECT user2_id FROM likes WHERE user1_id = ${id} AND link_code = 1) `/
	// 	+ `AS lst ON lst.id = users.id INNER JOIN pictures ON users.profile_pic_id = pictures.id`;
	
	
	db.query(query, function(err, results){
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.checkEmail = function(email, callback){
	var query = `SELECT user_name, veri_code FROM users WHERE email = "${email}"`;
	db.query(query, function(err, results){
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

User.prototype.logout = function(id, callback){
	var now = new Date();
	console.log('UserId loginout ' + id)
	var query = `UPDATE users SET online = '${now}' WHERE id = ${id}`;
	db.query(query, function(err, results){
		if (err){
			callback(err, null);
		}
		else{
			callback(null, results);
		}
	})
}

module.exports = User;