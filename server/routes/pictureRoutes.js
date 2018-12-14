var express = require('express');
var router = express.Router();

var picture_controller = require('../controllers/pictureController');

/// PICTURES ROUTES ///

// GET request for creating a picture. NOTE This must come before routes that display user (uses id).
router.get('/picture/create', picture_controller.picture_create_get);

// POST request for creating picture.
router.post('/picture/create', picture_controller.picture_create_post);

// GET request to delete picture.
router.get('/picture/:id/delete', picture_controller.picture_delete_get);

// POST request to delete picture.
router.post('/picture/:id/delete', picture_controller.picture_delete_post);

// GET request to update picture.
router.get('/picture/:id/update', picture_controller.picture_update_get);

// POST request to update picture.
router.post('/picture/:id/update', picture_controller.picture_update_post);

// GET request for creating a picture. NOTE This must come before routes that display user (uses id).
router.get('/pictures/id', picture_controller.picture_create_get);

// POST request for creating picture.
router.post('/picture/id', picture_controller.picture_create_post);