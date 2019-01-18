var express = require('express');
var router = express.Router();

var msg_controller = require('../controllers/msgController.js');

//MSG ROUTES//

//Sending a msg via POST to user in path

router.get('/msg', msg_controller.test)

router.post('/msg/send', msg_controller.sendMessage);

//Get conversation between 2 users
router.get('/msg/:user1/:user2', msg_controller.getConversation);

//Retrieve global chat msgs
// router.get('/msg/getglobal', msg_c/ontroller.fetch_global);


module.exports = router;