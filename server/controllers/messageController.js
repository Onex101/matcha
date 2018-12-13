var Msg = require('../models/messageModel');

//send msg
exports.msg_send_post = function(req, res) {
	id1 = req.body.id1;
	id2 = req.body.id2;
	let message = new Msg('');
	message.getByUserIds(id1, id2, function(err, results){
		if (err)
			return res.send(err)
		else
			return res.json({
				results
			})
	})
}

exports.msg_rec_get = function(req, res) {
	
}