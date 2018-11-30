var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/// USER ROUTES ///

// GET user home page.
router.get('/', user_controller.index);

// GET request for creating a user. NOTE This must come before routes that display user (uses id).
router.get('/user/create', user_controller.user_create_get);

// POST request for creating user.
router.post('/user/create', user_controller.user_create_post);

// GET request to delete user.
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET request to update user.
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user.
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user.
router.get('/user/:id', user_controller.user_detail);

// GET request to login user.
router.get('/login', user_controller.user_login_get);

// POST request to login user.
router.post('/login', user_controller.user_login_post);

// GET request for all users.
router.get('/users', user_controller.user_list);

// GET request for mtached users against userID
router.get('/user/:id/match', user_controller.user_match_get);

// POST request for mtached users against userID
router.post('/user/:id/match', user_controller.user_match_post);


module.exports = router;