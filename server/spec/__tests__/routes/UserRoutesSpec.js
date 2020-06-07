describe("User Routes suite", function() {

	var {app} = require('../../../index.js');
	var request = require("supertest");
	
	let globalId;

	beforeAll(
		//`should create a user`, 
		async function() {
		await request(app)
		.post("/user/create")
		.send({
				first_name: 'Deron',
				last_name: 'Rolfson',
				user_name: 'lamar91',
				birth_date: '1983-02-11T22:00:00.000Z',
				gender: 1,
				pref: 0.57,
				gps_lat: 17.973,
				gps_lon: -99.999,
				bio:
				'Ut animi eveniet optio fugit eum dolores ut consectetur molestiae quo aspernatur quo magni.',
				fame: 0,
				email: 'freeda81@example.com',
				password: '7e7d7c2297a619a23d825031c91ce38e7a339e6a',
				interests: 'potatoes,picnics,horses,computers,furniture',
				profile_pic_id: 1,
				online: '2020-06-02T17:22:23.000Z',
				pic: 'https://i.pravatar.cc/300?img=*',
				age: 37})
			.then((result)=>{
				globalId = result.body.insertId
				return globalId;
			})
			expect(globalId > 0)
	});

	it(`should update user details`, async function() {
		await request(app)
		.post("/user/update")
		.type("form")
		.send({ id: globalId, bio: 'This is a new bio', gender: '0', pref: '0', first_name: 'testNewFirstName', last_name: 'testNewLastName', email: 'test@email.com' })
		.expect({ success: 'Update sucessfull' })
	});

	it(`should return user details`, async function() {
		await request(app).get(`/user/${globalId}`)
		.expect("Content-Type", /json/)
		//Password hash will always be different
	});

	it(`should delete user details`, function() {
		return request(app)
		.get(`/user/${globalId}/delete`)
		.expect({})
	});



});