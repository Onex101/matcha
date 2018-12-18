var Msg = require('../models/messageModel');
var Conversation = require('../models/conversationModel');

//send msg
exports.sendMessage = function(req, res) {
	let data = req.body;
	let msg = new Msg(data);
	let conversation = new Conversation('');
	conversation.getByUsers(msg.data['sender'], msg.data['reciever'], function (err, result){
		if (err){
			res.send(err);
		}
		else{
			msg.data['conversation_id'] = result[0].id;
			msg.create(function(err, result){
				if (err){
					res.send(err);
				}
				else{
					res.send({success:'Message Sent'})
				}
			})
		}
	})
}

exports.getConversation = function(req, res) {
	data = req.params;
	let conversation = new Conversation(data);
	conversation.getByUsers(this.data.user1, this.data.user, function (err, results){
		if (err){
			res.send(err);
		}
		else{
			conversation.data['id'] = result[0].id;
			let msg = new Msg('');
			msg.getByConversationId(conversation.data.id, function (err, results){
				if (err){
					res.send(err);
				}
				else{
					res.send(results);
				}
			})
		}
	})
}