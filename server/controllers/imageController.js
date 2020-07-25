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
			res.send(result);
		}
	})
}

exports.image_delete_get = function(req, res){
	id = req.params.id;
	let image = new Image('');
	image.deletePic(id, function(err, result){
		if (err){
			res.send({
						error: 'failed to delete pic',
						sucess: err
					})
		}
		else{
			res.send("Pic id:"+ id +" has been deleted sucessfully")
		}
	})
}

exports.images_fetch_get = function(req, res){
	user_id = req.params.user_id;
	let image = new Image('')
	image.getAllPics(user_id, function(err, result){
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
	// res.send('NOT IMPLEMENTED: images fetch get');
}

exports.images_fetch_post = function(req, res){
	// res.send('NOT IMPLEMENTED: images fetch post');
}

exports.image_fetch_get = function(req, res){
	id = req.params.id;
	let image = new Image('');
	image.getPicById(id, function(err, result){
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

exports.image_by_id_get = function(req, res){
	id = req.params.id;
	let image = new Image('');
	image.getPicByPicId(id, function(err, result){
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

//gets profile pic by user_id
exports.profile_image_get = function(req, res){
	user_name = req.params.user_name;
	let image = new Image('');
	image.getProfilePic(user_name, function(err, result){
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
}

exports.image_fetch_post = function(req, res){
	res.send('NOT IMPLEMENTED: image fetch post');
}

exports.profile_image_set = function(req, res){
	user_name = req.params.user_name;
	image_id = req.params.pic_id;
	let image = new Image('');
	image.setProfilePic(user_name, image_id, function(err, result){
		if (err){
			res.send({
						error: 'failed to set profile pic',
						sucess: null
					})
		}
		else{
			res.send("Profile pic updated");
		}
	})
}

exports.new_profile_pic = function(req,res){
	data = req.body;
	let image = new Image(data);
	user_name = req.body.user_name;
	image.addNewProfilePic(function (err,result){
		if(err){res.send(err)}
		else{
			res.send("Done");
		}
	})
}

exports.image_replace = function(req, res){
	data = req.body;
	let image = new Image(data);
	image.replacePic(function (err, result){
		if (err){
			res.send('Couldnt not replace image');
			throw err;
		}
		else{
			res.send({success: 'Image updated'});
		}
	})
}