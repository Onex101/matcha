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
	noti.insertNoti( req.body.id, req.body.message, function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send({success:'Notification Sent', ...results})
		}
	})
}

exports.notification_get_by_id = function(req, res) {
	const noti = new Notification(req.params);
	noti.getNoti(function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send(results)
		}
	})
}

exports.notification_delete_by_id = function(req, res) {
	const noti = new Notification(req.params);
	noti.deleteNoti(function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send(results)
		}
	})
}

exports.notification_update_by_id = function(req, res) {
	const noti = new Notification(req.body);
	noti.updateNoti(function(err, results){
		if (err){
			console.log(err)
			res.send(err);
		}
		else{
			res.send(results)
		}
	})
}