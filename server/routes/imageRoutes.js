var express = require('express');
var router = express.Router();

var image_controller = require('../controllers/imageController');

/// IMAGES ROUTES ///

// GET request for creating a image.
router.get('/image/create', image_controller.image_create_get);

// POST request for creating image. - provisionally working, not tested with POST data
router.post('/image/create', image_controller.image_create_post);

// GET request to delete image. - working
router.get('/image/:id/delete', image_controller.image_delete_get);

// GET request for getting images by id - working
router.get('/images/:user_id', image_controller.images_fetch_get);

// GET request for getting image by id. - working
router.get('/image/:id', image_controller.image_fetch_get);

// GET request for getting profile image by user_id. -working
router.get('/image/:user_name/profilepic', image_controller.profile_image_get);

//GET request to set image as profile pic by pic_id
router.get('/image/setProfilePic/:user_name/:pic_id', image_controller.profile_image_set);

module.exports = router;