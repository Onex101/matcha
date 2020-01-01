var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.sendVeriCode = function(user_name, email){

    var vericode = (this.encrypt(user_name));
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
        text: vericode
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
        text: 'Hello '+user_name+'\n'+vericode+'A pawwsord reset request has been made to this account.\nPlease follow this link to reset your password:\nhttp://localhost:3000/ResetPassword'
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

exports.encrypt = function(user_name) {
    return(bcrypt.hashSync(user_name, 11));
}
