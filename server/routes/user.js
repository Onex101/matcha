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
// router.get('/user/:id', user_controller.user_detail);

router.get('/user/login', user_controller.user_login);

// GET request for all users.
router.get('/users', user_controller.user_list);

module.exports = router;