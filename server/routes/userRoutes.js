var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/// USER ROUTES ///

// GET user home page.
router.get('/', user_controller.index);

// GET request for creating a user. NOTE This must come before routes that display user (uses id).
router.get('/user/create', user_controller.user_create_get);

// POST request for creating user. - working
router.post('/user/create', user_controller.user_create_post);

// GET request to delete user. - working
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET request to update user.
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user.
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user. - working
router.get('/user/:id', user_controller.user_detail);

// GET request to login user.
router.get('/login', user_controller.user_login_get);

// POST request to login user. - working
router.post('/login', user_controller.user_login_post);

// GET request for all users. - working
router.get('/users', user_controller.user_list);

// GET request for mtached users against userID - working
router.get('/user/match/:id', user_controller.user_match_get);

// POST request for matched users against userID
router.post('/user/match', user_controller.user_match_post);

//GET a users interests - working
router.get('/user/:id/interests',user_controller.user_interests_get);

// POST request for checking if a user exists
router.post('/signup', user_controller.user_exists);

// POST request for checking if a user confirmation code is valid
router.post('/signup/verify', user_controller.user_verify);

// GET request to logout user
router.get('/logout/:id',user_controller.user_logout);


//** THESE THINGS SHAM */

//GET a users interests - working
router.get('/user/:id/interests',user_controller.user_interests_get);

// SET single interests for user via GET - done buggy on windows ?
router.get('/interests/set/:user_id/:interest_id', user_controller.set_interest);

// Replace interest via GET - done
router.get('/interests/replace/:user_id/:interest_id_old/:interest_id_new', user_controller.replace_interest);

// Add new interest and add to user who added it - done
router.get('/interests/new/:user_id/:interest', user_controller.new_interest);

// Remove interest (by giving interest name) from given user via GET - done
router.get('/interests/delete/:user_id/:interest', user_controller.delete_interest);

// GET interest table - done
router.get('/interests', user_controller.get_interests);

module.exports = router;