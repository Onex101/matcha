const Notification = require('../models/notificationModel');

exports.notification_set_post = function(req, res) {
	let noti = new Notification(req.body);
}

exports.notification_read_get = function(req, res) {
	let noti = new Notification({});
	noti.setRead( req.params.id, function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send({success:'Notification Set as read'})
		}
	})
}
exports.notification_unread_get = function(req, res) {
	let noti = new Notification({});
	console.log(req.params)
	noti.getUnread( req.params.user_id, function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send(results)
		}
	})
}

exports.notification_insert_post = function(req, res) {
	const noti = new Notification();
	console.log(req.body);
	noti.insertNoti( req.body.id, req.body.message, function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send({success:'Notification Sent'})
		}
	})
}