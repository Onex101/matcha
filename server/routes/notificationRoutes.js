var express = require('express');
var router = express.Router();

var notification_controller = require('../controllers/notificationController');

//NOTIFICATION ROUTES//

//Sending a notification via POST to user in path
router.post('/notification/:id/:msg/set', notification_controller.notification_set_post);

//Set given notification id as read
router.get('/notification/:id/read', notification_controller.notification_read_get);

//Sends amount of unread notification for the given user id
router.get('/notification/:user_id/unread', notification_controller.notification_unread_get);

//get by id
router.get('/notification/:id', notification_controller.notification_get_by_id);

//delete by id
router.get('/notification/:id/delete', notification_controller.notification_delete_by_id);

//update by id
router.post('/notification/update', notification_controller.notification_update_by_id);

router.post('/notification/create', notification_controller.notification_insert_post)

router.post('/notification/send', notification_controller.notification_insert_post);

module.exports = router;