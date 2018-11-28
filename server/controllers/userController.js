var User = require('../models/userModel');

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

// Display detail page for a specific User.
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
                    email: row.email,
                    password: row.password}
            res.json(user);
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
    var new_user = new User(req.body);
    new_user.save(function(err, results){
        if (err)
            res.send(err);
        else
            res.json(results);
    })
    // res.send('NOT IMPLEMENTED: User create POST');
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
exports.user_login = function(req, res) {
    let user = new User(req.body);
    user.login(user.data.user_name, function(err, results){
        if (err) {
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
        }else{
            if(results.length >0){
                if(results[0].password == password){ //need to use hash still
                    res.send({
                        "code":200,
                        "success":"login sucessfull"
                    });
                }else{
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    });
                }
            }else{
                res.send({
                    "code":204,
                    "success":"Email does not exist"
                });
            }
        }
    })
    res.send('NOT IMPLEMENTED: User verify GET');
};