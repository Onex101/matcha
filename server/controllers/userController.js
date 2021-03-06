var User = require('../models/userModel');
var Match = require('../matchFunctions');
const bcrypt = require('bcrypt');
const mail = require('../mail.js');


// Display index user.
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: User index');
};

// Display list of all Users.
exports.user_list = function(req, res) {
    let user = new User('');
    user.getAll(function(err, results){
        if (err)
            return res.send(err)
        else
            return res.json({
                data: results
            })
    })
};

// Display detail for a specific User.
exports.user_detail = function(req, res) {
    let user = new User('');
    user.getById(req.params.id, function(err, result){
        if (err)
            res.send(err);
        else{
            row = result[0];
            if (row)
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lon,
                    bio: row.bio,
                    fame: row.fame,
                    email: row.email,
					password: row.password,
					interests: row.interests,
					profile_pic_id: row.profile_pic_id,
					online: row.online,
					pic: row.pic,
					age: Match.getAge(row.birth_date)}
            res.json(user);
        }
    })
    // res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Check if a user exists based on username and email.
exports.user_exists = function(req, res) {
	let user = new User(req.body);
	user.exists(function(err, result){
		if (err) {
            res.send(err);
        }
		else{
			if(result.length > 0){
				row = result[0];
				if (row["user_name"] === user.data.user_name)
					res.json({exists: 'user_name'});
				else if (row["email"] === user.data.email)
					res.json({exists: 'email'});
			}
			else
				res.json({exists: 'null'});
		}
	})
	// res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

exports.check_email = function(req,res){
	let user = new User('');
	console.log(req.body)
	user.checkEmail(req.body['email'], function(err,results){
		if (err){
			res.send(err)
		}
		else{
			if (results.length){
				user_name = results[0].user_name;
				veri_code = results[0].veri_code;
				mail.sendPasswordReset(user_name, veri_code, req.body['email'])
				res.send({error: null})
			}
			else{
				res.send({error: 'email does not exist'})
			}
		}
	})
}

// Handle User create on POST.
exports.user_create_post = function(req, res) {
	var new_user = new User(req.body);
	new_user.data['birth_date'] = new_user.data['birth_date'].substring(0, 10);
	new_user.data['password'] = bcrypt.hashSync(new_user.data['password'], 10);
	new_user.data['fame'] = 0;
	new_user.data['verified'] = 0;
	new_user.data['veri_code'] = mail.sendVeriCode(new_user.data['user_name'], new_user.data['email']);
	new_user.save(function(err, results){
		if (err){
			// throw err;
			res.send(err);
			return;
		}else{
			res.send(results);
			res.end();
		}
	})
};

exports.user_update_password = function(req,res){
	let user = new User('');
	console.log(req.body)
	let hpass = bcrypt.hashSync(req.body['password'], 10);
	user.update_pass(req.body['user_name'], req.body['veri_code'], hpass, function(err, results){
		if (err)
            res.send(err);
        else
            res.send({success: 'Password updated'});
	})
}

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    let user = new User('');
    user.deleteById(req.params.id, function(err){
        if (err)
            res.send(err);
        else
            res.send('Succesfully deleted user');
    })
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    let user = new User(req.body);
    user.deleteById(user.data.id, function(err){
        if (err)
            res.send(err);
        else{
            res.send('Succesfully deleted user');
        }
    })
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
	res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
	let user = new User(req.body);
	// if (!user.data.bio || !user.data.gender || !user.data.pref || !user.data.id || !user.data.first_name || !user.data.last_name || !user.data.email){
	// 	console.log(user)
	// 	res.send({error: "Not all user values are present", user: user});
	// 	return;
	// }
	user.update_data(user.data.bio, user.data.gender, user.data.pref, user.data.id, user.data.first_name, user.data.last_name, user.data.email, function (err, results){
		if(err){res.send(err)}
		else{
			res.send({success: "Update sucessfull"});
		}
	})
};

// Verify User
exports.user_login_post = function(req, res) {
    let user = new User(req.body);
    user.login(function(err, results){
        if (err) {
			console.log(err)
            res.send({
              "status":400,
              "failed":"error ocurred"
            })
        }else{
            if(results.length > 0){
				bcrypt.compare(user.data.password, results[0].password, function (err, check){
					if (check == false){
						res.send({
							success:"Username and password does not match"
						});
					}
					else{
						row = results[0];
						user.login_user(row.user_name);
						if (row) 
							user.data = {
								id: row.id,
								first_name: row.first_name,
								last_name: row.last_name,
								user_name: row.user_name,
								birth_date: row.birth_date,
								gender: row.gender,
								pref: row.pref,
								gps_lat: row.gps_lat,
								gps_lon: row.gps_lat,
								bio: row.bio,
								fame: row.fame,
								email: row.email,
								password: row.password,
								interests: row.interests,
								profile_pic_id: row.profile_pic_id,
								pic: row.pic,
								age: Match.getAge(row.birth_date)}
						res.send({
							user,
							success:"login sucessfull"
						});
					}
				})
            }else{
				res.send({
				success:"Username does not exist"
                });
            }
        }
    })
    // res.send('NOT IMPLEMENTED: User verify POST');
};

exports.user_login_get = function(req, res) {
	res.send('NOT IMPLEMENTED: User verify GET');
};

// Display User MATCHES on GET.
exports.user_match_get = function(req, res) {
    let user = new User(data = {id: req.params.id});
    if (!user.data.id)
        return res.send("failed: user does not exist")
    user.getById(this.data['id'], function(err, result){
        if (err)
            res.send(err);
        else{
			row = result[0];
            if (row){
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lat,
                    bio: row.bio,
					fame: row.fame,
					interests: row.interests,
					pic: row.pic}
                    user.match(user.data.id, function (err, results){
                        if (err){
                            res.status(400)
                            res.send({
								"failed":"error ocurred"
                            })
                            throw err;
                        }
                        else {
                            var array = [];
							var i = 0;
                            while(results[i]){
                                dist = Match.getD_coff(user.data.gps_lat, user.data.gps_lon, results[i].gps_lat, results[i].gps_lon)
                                dist_raw = Match.getDistance(user.data.gps_lat, user.data.gps_lon, results[i].gps_lat, results[i].gps_lon)
                                ageCoff = Match.getA_coff(user.data.birth_date, results[i].birth_date)
                                pref = Match.getP_coff(user.data.gender, user.data.pref, results[i].gender, results[i].pref)
                                like = Match.getL_coff(user.data.interests, results[i].interests);
                                var matchC =  (dist) +  (ageCoff) +  (5*pref) + (like) //weightings can be adjusted as needed here
                                let new_data = results[i]
                                if(matchC > 4){ //4 is an arb number to exclude any matches that fall too far because of gender/pref differential
									new_user = new User(new_data); 
									new_user.data.online = results[i].online;
									new_user.data.gps_lat = results[i].gps_lat;
									new_user.data.gps_lon =  results[i].gps_lon;
									new_user.data.email =  results[i].email;
                                    new_user.match = matchC;
                                    new_user.like = like  * 100;
                                    new_user.dist_raw = dist_raw;
									new_user.birth_date_diff = Math.abs(Match.getAge(user.data.birth_date) - Match.getAge(results[i].birth_date));
									new_user.interests = results[i].interests;
									new_user.pic = results[i].pic;
									new_user.profile_pic_id = results[i].profile_pic_id;
									new_user.tagMatch = like * 10;
                                    array.push(new_user);
                                }
                                i++;
							}
							array.sort(sortFunction);
                            obj = {};
                            for (var key in array) {
                                obj[key] = array[key]
							}
							// console.log("RESULTS")
							// console.log(obj)
                            res.json(obj);
                        }
                    })
            }    
        }
    })
    // res.send('NOT IMPLEMENTED: User match GET');
};

// Displat User MATCHES on POST.
exports.user_match_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User match POST');
};

// Check if user is verified
exports.user_checkVerify = function(req, res){
	let user = new User('');
	user.getByUsername(req.body['user_name'], function(err, results){
		if (err){
			res.send(err)
		}
		else{
			if (user.data.verified){
				res.send('User verified')
			}
			else{
				res.send('User not verified')
			}
		}
	})
}

// Verify user
exports.user_verify = function(req, res){
	let user = new User('');
	user.getByUsername(req.body.user_name, function(err, results){
        user = new User(results);
		if (err){
            res.send(err)
		}
		else{
			console.log(req.body['veri_code'] + "\n"+ results[0].veri_code);
			if (results[0] === null){
				res.send({error:'no results'})
			}
			else if(req.body['veri_code'] != results[0].veri_code){
				res.send({error: 'veri-code is incorrect', success: null});
            }
            else{
                user.data['verified'] = 1;
                user.update(function(err, result){
                    if (err){
                        res.send({error:'verification update fail', success: null});
                        throw err
                    }
                    else
                        res.send({error: null, success: 'veri-code is correct'});
                })
            }
		}
	})
}

//GETs all interests for a given user
exports.user_interests_get = function(req, res){
	let user = new User('');
	user.getInterestById(req.params.id, function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send(results);
		}
	})
}

//GET /interests/set/:user_id/:interest_id
exports.set_interest = function(req, res){
	let user = new User('');
	user.setInterestByIds(req.params.user_id, req.params.interest_id, function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send(results);
		}
	})
}

exports.set_interest_by_name = function(req, res){
	let user = new User('');
	user.setInterestByName(req.params.user_id, req.params.interest_name, function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send(results);
		}
	})
}

//GET /interests/replace/:user_id/:interest_id_old/:interest_id_new
exports.replace_interest = function(req, res){
	let user = new User('');
	user.replaceInterest(req.params.user_id, req.params.interest_id_old, req.params.interest_id_new, function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send("Interests updated succesfully");
		}
	})
}

//GET /interests/new/:user_id/:interest'
exports.new_interest = function(req, res){
	let user = new User('');
	user.createNewInterest(req.params.user_id,req.params.interest, function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send(results);
		}
	})
}

//GET /interests/delete/:user_id/:interest
exports.delete_interest = function(req, res){
	let user = new User('');
	user.removeInterestByUserId(req.params.user_id, req.params.interest, function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send(results);
		}
	})
}

//GET /interests
exports.get_interests = function(req, res){
	let user = new User('');
	user.fetchInterestsList(function(err, results){
		if(err){
			res.send(err)
		}
		else{
			res.send(results);
		}
	})
}

//Like user
exports.like_userId = function(req, res){
	let user = new User('');
	user.like(req.params.user_id, req.params.target_id, function(err, results){
		if (err){
			res.send(err)
		}
		else{
			res.send({success: "Update complete"});
		}
	})
}

//DisLike user
exports.dislike_userId = function(req, res){
	let user = new User('');
	user.dislike(req.params.user_id, req.params.target_id, function(err, results){
		if (err){
			res.send(err)
		}
		else{
			res.send({success: "Update complete"});
		}
	})
}

//get list of people liked by :user_id
exports.get_liked = function(req, res){
	let user = new User('');
	user.linked_users(req.params.id,function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

//Get list of people that like the current user
exports.getUsersThatLikeCurrentUser = function(req, res){
	let user = new User('');
	user.getUsersThatLikeCurrentUser(req.params.id,function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.getUsersThatCurrentUserLikes = function(req, res){
	let user = new User('');
	user.getUsersThatCurrentUserLikes(req.params.id,function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.update_gps = function(req, res){
	let user = new User('');
	user.set_gps(req.params.id, req.params.lat, req.params.lon, function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.add_visit = function(req, res){
	let user = new User('');
	user.addVisit(req.params.viewer_id, req.params.viewee_id, function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.get_visits = function(req, res){
	let user = new User('');
	user.getVisits(req.params.id, function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.get_match_details = function(req, res){
	let user = new User('');
	user.getMatchDetails(req.params.user_id, req.params.match_id, function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.get_user_details = function(req, res){
	let user = new User('');
	user.getUserDetails(req.params.user_id, function(err, results){
		if(err){res.send(err);}
		else{
			res.send(results)
		}
	})
}

exports.search_minfame = function(req, res){
	let user = new User('');
	user.getById(req.params.user_id, function(err, result){
        if (err)
            res.send(err);
        else{
			row = result[0];
            if (row){
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lat,
                    bio: row.bio,
					fame: row.fame,
					interests: row.interests,
					pic: row.pic}
				}
				user.search_fame(req.params.x, req.params.user_id, function(err, results){
					if(err){res.send(err);}
					else{
						res.json(matchAlgo(user, results));
					}
				})
		}
	})
}

//sorting function to sort by match score
function sortFunction(a, b) {
    if (a['match'] === b['match']) {
        return 0;
    }
    else {
        return (a['match'] > b['match']) ? -1 : 1;
    }
}

exports.user_logout = function(req, res){
    let user = new User('');
    user.logout(req.params.id, function(err, results){
        if (err){
            res.send(err)
        }
        else{
            res.send("Logged out");
        }
    })
}

exports.linked_details = function(req, res){
	let user = new User('');
	user.linked(req.params.id, function(err, results){
		if (err){
            res.send(err)
        }
        else{
            res.send(results);
        }
	})
}

exports.search_username = function(req,res){
	let user = new User('');
	user.user_search(req.params.user_id, req.params.search_name, function(err, results){
		if (err){
            res.send(err)
        }
        else{
            res.send(results);
        }
	})
}

exports.search_tags = function(req,res){
	let user = new User('');
	user.getById(req.params.user_id, function(err, result){
        if (err)
            res.send(err);
        else{
			row = result[0];
            if (row){
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lat,
                    bio: row.bio,
					fame: row.fame,
					interests: row.interests,
					pic: row.pic}
				}
				user.tag_search(req.params.user_id, req.params.interest, function(err, results){
					if (err){
						res.send(err)
					}
					else{
						res.json(matchAlgo(user, results));
					}
				})
		}
	})
}

exports.tag_search = function (req, res){
	let user = new User('');
	let interests = [];
	console.log(JSON.stringify(req.body))
	req.body.interests.forEach(element => {
		delete element.id
		interests.push(element.name);
	});
	console.log(interests)
	user.getById(req.body.user_id, function(err, result){
        if (err)
            res.send(err);
        else{
			row = result[0];
            if (row){
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lat,
                    bio: row.bio,
					fame: row.fame,
					interests: row.interests,
					pic: row.pic}
				}
				user.tag_search(req.body.user_id, interests, function(err, results){
					if (err){
						res.send(err)
					}
					else{
						res.json(matchAlgo(user, results));
					}
				})
		}
	})
}



exports.get_tmp = function(req, res){
	let user = new User('')
	user.getByUsername(req.params.user_name, function(err, results){
        if (err){
            res.send(err)
        }
        else{
            res.send(results);
        }
    })
}

exports.check_password_reset = function(req, res){
	let user = new User('')
	user.getByUsername(req.params.user_name, function(err, results){
        if (err){
            res.send(err)
        }
        else{
			user.data = results[0];
			if (results.length)
				if (user.data.veri_code == req.params.veri_code){
					res.send({error: null})
				}
				else{
					res.send({error: 'verification code failed'})
				}
			else{
				res.send({error: 'no user exists'})
			}
        }
    })
}

exports.get_matches_age = function(req,res){
	let user = new User('');
	user.getById(req.params.user_id, function(err, result){
        if (err)
            res.send(err);
        else{
			row = result[0];
            if (row){
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lat,
                    bio: row.bio,
					fame: row.fame,
					interests: row.interests,
					pic: row.pic}
				}
				user.getMaxAgeGapMatch(req.params.user_id, req.params.x, function(err, results){
					if (err){
						res.send(err)
					}
					else{
						res.json(matchAlgo(user, results));
						}
					})
		}
	})
}

exports.get_locations = function(req, res){
	let user = new User('');
	user.getLocations(function(err, result){
		if (err){
            res.send(err);
		}
		else{
			res.send(result)
		}
	})
}

exports.get_users_by_location = function(req, res){
	let user = new User('');
	user.getById(req.params.id, function(err, result){
        if (err)
            res.send(err);
        else{
			row = result[0];
            if (row){
                user.data = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    user_name: row.user_name,
                    birth_date: row.birth_date,
                    gender: row.gender,
                    pref: row.pref,
                    gps_lat: row.gps_lat,
                    gps_lon: row.gps_lat,
                    bio: row.bio,
					fame: row.fame,
					interests: row.interests,
					pic: row.pic}
				}
			user.getUsersByLocation(req.params.id, req.params.gps_lat, req.params.gps_lon, function(err, results){
				if (err){
					res.send(err);
				}
				else{
					res.json(matchAlgo(user, results));
				}
			})
		}
	})
}

exports.get_block_user = function (req, res){
	let user = new User('');
	user.blockUserById(req.params.user1, req.params.user2, function(err, result){
		if (err)
			res.send(err);
		else{
			res.send({success: "Blocked succesfully"})
		}
	})
}

exports.get_users_like_Code = function (req, res){
	let user = new User('');
	user.getUsersLikeCode(req.params.user1, req.params.user2, function(err, result){
		if (err)
			res.send(err);
		else{
			res.send(result)
		}
	})
}



function matchAlgo(user, results){
	var array = [];
	var i = 0;
	while(results[i]){
		dist = Match.getD_coff(user.data.gps_lat, user.data.gps_lon, results[i].gps_lat, results[i].gps_lon)
		dist_raw = Match.getDistance(user.data.gps_lat, user.data.gps_lon, results[i].gps_lat, results[i].gps_lon)
		ageCoff = Match.getA_coff(user.data.birth_date, results[i].birth_date)
		pref = Match.getP_coff(user.data.gender, user.data.pref, results[i].gender, results[i].pref)
		like = Match.getL_coff(user.data.interests, results[i].interests);
		var matchC =  (dist) +  (ageCoff) +  (5*pref) + (like) //weightings can be adjusted as needed here
		let new_data = results[i]
		if(matchC > 4){ //4 is an arb number to exclude any matches that fall too far because of gender/pref differential
			new_user = new User(new_data); 
			new_user.data.online = results[i].online
			new_user.data.gps_lat = results[i].gps_lat;
			new_user.data.gps_lon =  results[i].gps_lon;
			new_user.data.email =  results[i].email;
			new_user.match = matchC;
			new_user.like = like  * 100;
			new_user.dist_raw = dist_raw;
			new_user.birth_date_diff = Math.abs(Match.getAge(user.data.birth_date) - Match.getAge(results[i].birth_date));
			new_user.interests = results[i].interests;
			new_user.pic = results[i].pic;
			new_user.profile_pic_id = results[i].profile_pic_id;
			new_user.tagMatch = like * 10;
			array.push(new_user);
		}
		i++;
	}
	array.sort(sortFunction);
	obj = {};
	for (var key in array) {
		obj[key] = array[key]
	}
	return obj;
}