var Notification = require('../models/notificationModel');

exports.notification_set_post = function(req, res) {
	let noti = new Notification(req.body);
}
exports.notification_read_get = function(req, res) {
	let noti = new Notification({});
}
exports.notification_unread_get = function(req, res) {
	let noti = new Notification({});
}