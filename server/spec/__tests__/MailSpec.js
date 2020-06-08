describe("E-Mailing suite", function() {

	it("should send Password Rest email", async function() {
		var Mail = require('../../mail.js');
		let result = await Mail.sendPasswordReset('username', 'vericode', 'email@email.com');
		expect(result).toBeTruthy;
	});

	it("should send verification email", async function() {
		var Mail = require('../../mail.js');
		let result = await Mail.sendVeriCode('username','email@email.com');
		expect(result).toBeTruthy;
	});

});