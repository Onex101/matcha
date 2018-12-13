var User = require('../models/userModel');
var Match = require('../matchFunctions');

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
                    gps_lon: row.gps_lat,
                    likes: row.likes,
                    fame: row.fame,
                    email: row.email,
                    password: row.password}
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
            row = result[0];
            if (row["user_name"] === user.data.user_name)
				res.json({exists: 'user_name'});
			else if (row["email"] === user.data.email)
				res.json({exists: 'email'});
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

// Handle User create on POST.
exports.user_create_post = function(req, res) {
    console.log(req.body);
    // var new_user = new User(req.body);
    // new_user.save(function(err, results){
    //     if (err)
    //         res.send(err);
    //     else
    //         res.json(results);
    // })
    res.send('NOT IMPLEMENTED: User create POST');
};

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    let user = new User('');
    user.deleteById(req.params.id, function(err){
        if (err)
            res.send(err);
        else
            res.send('Succesfully deleted user');
    })
    // res.send('NOT IMPLEMENTED: User delete GET');
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
	res.send('NOT IMPLEMENTED: User update POST');
};

// Verify User
exports.user_login_post = function(req, res) {
    let user = new User(req.body);
    user.login(function(err, results){
        if (err) {
            res.send({
              "status":400,
              "failed":"error ocurred"
            })
        }else{
            if(results.length > 0){
                if(results[0].password == user.data.password){ //need to use hash still
                    row = results[0];
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
                        likes: row.likes,
                        fame: row.fame,
                        email: row.email,
                        password: row.password
                    }
                    // res.status(200);
                    res.json({
                        user,
                        "success":"login sucessfull"
                    });
                }else{
                    // res.status(204);
                    res.send({
                        "success":"Username and password does not match"
                    });
                }
            }else{
                // res.status(204);
                res.send({
                    "success":"Username does not exist"
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
    testData = {id: '4', user_name: 'brandon', first_name: 'Brandon',last_name: 'Feifer', email:'bran123456@hmail.com', birth_date:'26', gender:'0.7', pref:'1', gps_lat:'-37.957',gps_lon:'19.517', likes:'#picnic#nature#photography'}
    let user = new User(testData);
    // console.log(user);
    // console.log(user.data.gps_lat);
    if (!user.data.id)
        return res.send("failed: user does not exist")
    user.match(function (err, results){
        // console.log(results);
        if (err){
            throw err
            res.status(400)
            res.send({
                "failed":"error ocurred"
            })
        }
        else{
            // console.log(test)
            // console.log("potato")
            var array = [];
            var i = 0;
            // console.log(results[0]);
            // testData = {id: '4', user_name: 'brandon', first_name: 'Brandon',last_name: 'Feifer', email:'bran123456@hmail.com', birth_date:'26', gender:'0.7', pref:'1', gps_lat:'-37.957',gps_lon:'19.517', likes:'#picnic#nature#photography'}
            // let user = new User(testData);
            while(results[i]){
                // console.log(i);
                dist = Match.getD_coff(user.data.gps_lat, user.data.gps_lon, results[i].gps_lat, results[i].gps_lon)
                dist_raw = Match.getDistance(user.data.gps_lat, user.data.gps_lon, results[i].gps_lat, results[i].gps_lon)
                birth_date = Match.getA_coff(user.data.birth_date, results[i].birth_date)
                pref = Match.getP_coff(user.data.gender, user.data.pref, results[i].gender, results[i].pref)
                like = Match.getL_coff(user.data.likes, results[i].likes)
                var match =  (dist) +  (birth_date) +  (5*pref) + (like)
                let new_data = results[i]
                if(match > 4){ //4 is an arb number to exclude any matches that fall too far because of gender/pref differential
                    new_user = new User(new_data);
                    // console.log(new_user);
                    new_user.match = match;
                    new_user.like = like  * 100;
                    new_user.dist_raw = dist_raw;
                    new_user.birth_date_diff = Math.abs(new_user.birth_date - results[i].birth_date);
                    // console.log(new_user);
                    array.push(new_user);
                }
                i++;
            }
            // console.log("Results: " + results);
            res.json(
               array
            )
        }
    })
    // res.send('NOT IMPLEMENTED: User match GET');
};

// Displat User MATCHES on POST.
exports.user_match_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User match POST');
};
