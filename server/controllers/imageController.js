var User = require('../models/userModel');
var Image = require('../models/imageModel');

exports.image_create_get = function(req, res){
	res.send('NOT IMPLEMENTED: image create get');
}

exports.image_create_post = function(req, res){
	data = req.body;
	let image = new Image(data);
	image.savePic(function (err, result){
		if (err){
			res.send('Couldnt not save image');
			throw err;
		}
		else{
			res.send('Image saved');
		}
	})
	// res.send('NOT IMPLEMENTED: image create post');
}

exports.image_delete_get = function(req, res){
	res.send('NOT IMPLEMENTED: image delete get');
}

exports.image_delete_post = function(req, res){
	data = req.body;
	let image = new Image(data);
	image.deletePic(function(err, results){
		if (err){
			res.send({
						error: 'failed to deleted pic',
						sucess: null
					})
		}
		else{
			res.send({
						error : null,
						success: 'Succesfully deleted pic'
					})
		}
	})
	// res.send('NOT IMPLEMENTED: image delete post');
}

exports.image_update_get = function(req, res){
	let data = req.params.id;
	let image = new Image(data);
	image.setProfilePic(function (err, result){
		if (err){
			res.send({
				error: 'failed to set profile pic',
				sucess: null
			})
		}
		else{
			res.send({
				error: null,
				sucess: 'set profile pic'
			})
		}
	})
	res.send('NOT IMPLEMENTED: image update get');
}

exports.image_update_post = function(req, res){
	res.send('NOT IMPLEMENTED: image update post');
}

exports.images_fetch_get = function(req, res){
	let user_id = req.params.id;
	let image = new Image(data = {id: null, user_id: user_id, data: null})
	image.getAllPics(function(err, result){
		if (err){
			res.send({
						error: 'failed to get pics',
						sucess: null
					})
		}
		else{
			res.json(result)
		}
	})
	res.send('NOT IMPLEMENTED: images fetch get');
}

exports.images_fetch_post = function(req, res){
	// res.send('NOT IMPLEMENTED: images fetch post');
}

exports.image_fetch_get = function(req, res){
	data = req.params;
	let image = new Image(data)
	image.getPicById(function(err, result){
		if (err){
			res.send({
						error: 'failed to get pic',
						sucess: null
					})
		}
		else{
			res.json(result)
		}
	})
	// res.send('NOT IMPLEMENTED: image fetch get');
}

exports.image_fetch_post = function(req, res){
	res.send('NOT IMPLEMENTED: image fetch post');
}

exports.profle_image_get = function(req, res){
	data = req.params;
	let image = new Image(data);
	image.getProfilePic(function(err, result){
		if (err){
			res.send({
						error: 'failed to get profile pic',
						sucess: null
					})
		}
		else{
			res.json(result)
		}
	})
}