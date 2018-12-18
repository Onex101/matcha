var express = require('express');
var router = express.Router();

var notification_controller = require('../controllers/notificationController');

//NOTIFICATION ROUTES//

//Sending a notification via POST to user in path
router.post('/notification/:id/:msg/set', notification_controller.notification_set_post);

//Set given notification id as read
router.get('/notification/:id/read', notification_controller.notification_read_get);

//Sends amount of unread notification for the given user
router.get('/notification/:user/unread', notification_controller.notification_unread_get);

module.exports = router;