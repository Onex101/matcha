var Msg = require('../models/messageModel');
var Conversation = require('../models/conversationModel');

//send msg
exports.test = function(req, res){
	res.send({broke: 'broke'});
}

exports.sendMessage = function(req, res) {
	let data = req.body;
	let msg = new Msg(data);
	console.log(msg)
	msg.create(function(err, results){
		if (err){
			res.send(err);
		}
		else{
			res.send({success:'Message Sent'})
		}
	})
}

exports.getConversation = function(req, res) {
	data = req.params;
	// console.log("test")
	// console.log(data)
	let conversation = new Conversation(data);
	if (data.user2 == 'Community'){
		conversation.data['id'] = 1;
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
	else{
		conversation.getByUsers(this.data.user1, this.data.user2, function (err, result){
			console.log(result);
			if (err){
				res.send(err);
			}
			else{
				if (result.length){
					conversation.data['id'] = result[0].id;
					let msg = new Msg('');
					msg.getByConversationId(conversation.data.id, function (error, results){
						if (error){
							res.send(error);
						}
						else{
							var ret = {}
							ret.body = results.body
							ret.conversation = conversation.data
							console.log("Grabbed users conversation")
							console.log(conversation.data)
							console.log(ret)
							// if (!results.length)
							// 	res.json(conversation.data);
							// else
							res.send(ret)
						}
					})
				}
				// else{
				// 	res.send({fail: "no results"});
				// }
			}
		})
	}
}