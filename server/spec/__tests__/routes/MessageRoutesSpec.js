describe("Message Routes suite", function() {

	var {app} = require('../../../index.js');
	var request = require("supertest");
	
	let user1 = 1;
	let user2 = 2;
	let conversationId;

	beforeAll(
		//`should return conversation data`, 
		async function() {
		await request(app).get(`/msg/${user1}/${user2}`)
		.expect("Content-Type", /json/)
		.expect((response)=>{
			conversationId = response.body[0].id || response.body.id || response.body.insertId
		})
	});

	it(`should send message data`, async function() {
		await request(app)
		.post("/msg/send")
		.type('form')
		.send({conversation_id: conversationId, sender: user1, message: 'Test message from user1'})
		.expect((response)=>{
			expect(response.body.success).toBe("Message Sent")
		})
	});

});