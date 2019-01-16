var Message = require('../models/messageModel');

//send msg via POST
exports.sendMessage = function(req, res) {
	let data = req.body;
	let msg = new Message(data);
	msg.sendMsg(msg.data['sender'], msg.data['receiver'], msg.data['msg'], function (err, result){
		if (err){
			res.send(err);
		}
		else{
			res.send({success:'Message Sent'})
		}
	})
}

//receive msgs between given user id's
exports.get_conversation = function(req, res){
	let msg = new Message('');
	console.log(req.params);
	msg.getConv(req.params.id1, req.params.id2, function (err, result){
		if (err){
			res.send(err);
		}
		else{
			res.send(result)
		}
	})
}

//Retrieve all msgs any user sent to global chat
exports.fetch_global = function(req, res){
	let msg = new Message('');
	msg.getGlobal(function (err, result){
		if (err){
			res.send(err);
		}
		else{
			res.send(result)
		}
	})
}