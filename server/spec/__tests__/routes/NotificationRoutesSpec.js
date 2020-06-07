describe("Notification Routes suite", function() {

	var {app} = require('../../../index.js');
	var request = require("supertest");
	
	let globalId = 1;
	let imageId;

	beforeAll(
		// `should create an image`, 
		async function() {
			await request(app)
			.post("/notification/create")
			.type('form')
			.send({id: `${globalId}`, message: "Test Message"})
			.then((result)=>{
				imageId = result.body.insertId
				// console.log(imageId)
				expect(imageId).toBeTruthy
			})
			expect(imageId > 0);
		}
	);

	it(`should update notification data`, async function() {
		// console.log(imageId)
		await request(app)
		.post("/notification/update")
		.type('form')
		.send({id: imageId, noti: 'Test Message Changed'})
		.expect((response)=>expect(response.body.affectedRows).toEqual(1))
	});

	it(`should return notification data`, async function() {
		await request(app).get(`/notification/${imageId}`)
		.expect("Content-Type", /json/)
		.expect((response)=>expect(response.body[0].noti).toBe('Test Message Changed'))
	});

	it(`should delete notification data`, function() {
		return request(app)
		.get(`/notification/${imageId}/delete`)
		.expect(response=>expect(response.body.affectedRows).toEqual(1))
	});

});