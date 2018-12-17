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
		likes: null,
		fame: null,
		email: null,
		password: null,
		veri_code: null,
		verified: null
	},
	message: {
		id: null,
		user1_id: null,
		user2_id: null,
		message: null
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