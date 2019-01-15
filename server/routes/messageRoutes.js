var express = require('express');
var router = express.Router();

var msg_controller = require('../controllers/messageController');

//MSG ROUTES//

//Sending a msg via POST to user in path
router.post('/msg/:id/send', msg_controller.sendMessage);

//Receive updated list of msgs from server between logged in user and given user using get
router.get('/msg/:id1/id2/receive', msg_controller.get_conversation);

module.exports = router;