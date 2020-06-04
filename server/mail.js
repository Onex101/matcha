var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { NOTIFICATION } = require('../client/src/Events')

exports.sendVeriCode = function(user_name, email){

    var vericode_check = (this.encrypt(user_name));

    var vericode = vericode_check.replace(/\//g, '_');
    // queryString.replace(/\//g, '_');
    // queryString.replaceAll('/', '_');


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'samamander404@gmail.com',
        pass: 'PineappleExpress1@'
        }
    });
    //db.query("INSERT INTO users (input value, input value, input value ...,{:vericode},...)");
    var mailOptions = {
        from: 'matchamailer@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: 'Hello '+user_name+'\nWelcome to Matcha!\nYour account is almost ready, there is just one more step...\nPlease follow this link to reset your password:\nhttp://localhost:3000/Verification?user=' + user_name + '&origin=' + vericode
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
			console.log(error);
			return;
        } else {
            console.log('Email sent: ' + info.response);
        }
	});
	return (vericode); 
}

exports.sendPasswordReset = function(user_name, vericode, email){

    var vericode = vericode;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samamander404@gmail.com',
            pass: 'PineappleExpress1@'
        }
    });
    //db.query("INSERT INTO users (input value, input value, input value ...,{:vericode},...)");
    var mailOptions = {
        from: 'matchamailer@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: 'Hello '+user_name+'\nA password reset request has been made to this account.\nPlease follow this link to reset your password:\nhttp://localhost:3000/ResetPassword?user=' + user_name + '&origin=' + vericode
    };
    // A pawwsord reset request has been made to this account.\nPlease follow this link to reset your password:\nhttp://localhost:3000/ResetPassword
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
			console.log(error);
			return;
        } else {
            console.log('Password Reset sent: ' + info.response);
        }
	});
}

exports.reportUser = function(user_name, email, socket){

    var vericode = vericode;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samamander404@gmail.com',
            pass: 'PineappleExpress1@'
        }
    });
    var mailOptions = {
        from: 'matchamailer@gmail.com',
        to: email,
        subject: 'Account has been reported',
        text: 'Hello '+user_name+'\nYour account has been reported by one of our users and will be investigated by our amazing Investigation Assistant (IA).\n If anything that goes against our policy is found by our IA, be warned that your account will be blocked.\n For any further information, we do not have any\n Thank you for your time and have a good day\n Your Friendly Neighbourhood Automated Emailer'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
			console.log(error);
			return;
        } else {
            if (socket){
                socket.on(NOTIFICATION, 'You have been reported', user_name);
            }
            console.log('Report Sent: ' + info.response);
        }
	});
}


exports.encrypt = function(user_name) {
    return(bcrypt.hashSync(user_name, 11));
}
