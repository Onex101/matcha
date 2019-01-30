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

// POST request to update user. User object must contain: id, bio, gender, pref
router.post('/user/update', user_controller.user_update_post);

//POST request to check if an email exists and if it does returns user_name and veri_code
router.post('/email/check', user_controller.check_email);

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

//GET a users interests - working
router.get('/user/:id/interests',user_controller.user_interests_get);

// SET single interests for user via GET - done
router.get('/interests/set/:user_id/:interest_id', user_controller.set_interest);

// Replace interest via GET - done
router.get('/interests/replace/:user_id/:interest_id_old/:interest_id_new', user_controller.replace_interest);

// Add new interest and add to user who added it - done
router.get('/interests/new/:user_id/:interest', user_controller.new_interest);

// Remove interest (by giving interest name) from given user via GET - done
router.get('/interests/delete/:user_id/:interest', user_controller.delete_interest);

// GET interest table - done
router.get('/interests/', user_controller.get_interests);

// Like user
router.get('/like/:user_id/:target_id', user_controller.like_userId);

// DisLike user
router.get('/dislike/:user_id/:target_id', user_controller.dislike_userId);

//get liked
router.get('/user/:id/getliked', user_controller.get_liked);

//SET NEW interest by name and user_id
router.get('/interest/:user_id/:interest_name', user_controller.set_interest_by_name);

//GET request to get user's info by id. Needs to return: Fame, Visits, Name, Surname, Distance, Age
router.get('/match/details/:user_id/:match_id', user_controller.get_match_details);

//GET request to get more details when given the ID. return: Fame, Visits, Name, Surname, Age
router.get('/user/details/:user_id', user_controller.get_user_details);

//GET request that adds +1 visit to user's profile (by user_id or username). Front end will send this every time someone clicks on a username of a usercard to see the profile
router.get('/user/visit/:viewer_id/:viewee_id', user_controller.add_visit);

//GET list of users who have visited your page
router.get('/user/:id/history', user_controller.get_visits);

//GET request that reutrns the people the user has liked (return the same stuff as getMatches
router.get('/user/:id/liked', user_controller.linked_details);

//GET request for users with the same characters in their username
router.get('/usersearch/:user_id/:search_name', user_controller.search_username);

//GET request for users with the tag matching the search (using suggestion system like in normal tags creating)
router.get('/tagsearch/:user_id/:interest', user_controller.search_tags);

//GET request for users with a fame rating of at least x
router.get('/famesearch/:user_id/:x', user_controller.search_minfame);

router.get('/user/tmp/:user_name', user_controller.get_tmp);

module.exports = router;