var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.sendVeriCode = function(user_name, email){

    var vericode = (this.encrypt(user_name));
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'matchamailer@gmail.com',
        pass: 'badpassword'
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
        } else {
            console.log('Email sent: ' + info.response);
        }
	});
	return (vericode); 
}

exports.encrypt = function(user_name) {
    return(bcrypt.hashSync(user_name, 11));
}
