var Msg = require('../models/messageModel');
var Conversation = require('../models/conversationModel');

//send msg
exports.test = function(req, res){
	res.send({broke: 'broke'});
}

exports.sendMessage = function(req, res) {
	let data = req.body;
	let msg = new Msg(data);
	msg.create(function(err, results){
		if (err){
			res.send(err);
		}
		else{
			res.send({success:'Message Sent', ...results})
		}
	})
}

exports.getConversation = function(req, res) {
	data = req.params;
	let conversation = new Conversation(data);
	let msg = new Msg('');
	if (data.user2 == 1){
		conversation.data['id'] = 1;
		msg.getByConversationId(conversation.data.id, function (err, results){
			if (err){
				res.send(err);
			}
			else{
				res.send(results);
			}
		})
	}
	else{
		msg.getByMessagesByUserIds(conversation.data.user1, conversation.data.user2, function (err, result){
			if (err){
				res.send(err);
			}
			else{
				//if conversation already exists and has msgs
				if (result.length){
					res.send(result)
				}
				//else if conversation contains no msgs
				else{
					conversation.getConversationId(conversation.data.user1, conversation.data.user2, function (err, result){
						//if it already exists
						if (err)
							res.send(err)
						else if(result.length){
							res.send(result)
						}
						//else create conversation
						else{
							conversation.create(conversation.data.user1, conversation.data.user2, function (err, result){
								if (err){
									res.send(err);
								}
								else{
									res.send(result)
								}
							})
						}
					})
				}
			}
		})
	}
}