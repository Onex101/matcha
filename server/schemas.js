var schemas = {
	user: {
		id: null,
		first_name: null,
		last_name: null,
		user_name: null,
		birth_date: null,
		gender: null,
		pref: null,
		gps_lat: null,
		gps_lon: null,
		bio: null,
		fame: null,
		email: null,
		password: null,
		veri_code: null,
		verified: null,
		profile_pic_id: null
	},
	message: {
		id: null,
		sender: null,
		receiver: null,
		message: null
	},
	conversation: {
		id: null,
		user1: null,
		user2: null
	},
	image: {
		id: null,
		user_id: null,
		data: null
	},
	notification:{
		id: null,
		user_id: null,
		noti: null,
		viewed: null
	}
}

module.exports = schemas;