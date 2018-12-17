var express = require('express');
var router = express.Router();

var image_controller = require('../controllers/imageController');

/// IMAGES ROUTES ///

// GET request for creating a image.
router.get('/image/create', image_controller.image_create_get);

// POST request for creating image.
router.post('/image/create', image_controller.image_create_post);

// GET request to delete image.
router.get('/image/:id/delete', image_controller.image_delete_get);

// POST request to delete image.
router.post('/image/:id/delete', image_controller.image_delete_post);

// GET request to update image.
router.get('/image/:id/update', image_controller.image_update_get);

// POST request to update image.
router.post('/image/:id/update', image_controller.image_update_post);

// GET request for getting images by id
router.get('/images/:id', image_controller.images_fetch_get);

// GET request for getting image by id.
router.get('/image/:id', image_controller.image_fetch_get);

// GET request for getting profile image by user_id.
router.get('/profile_pic/:user_id', image_controller.profle_image_get);