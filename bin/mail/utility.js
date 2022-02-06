const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "slickcomm.de",
    port: 587,
    auth: {
        user: 'info@slickcomm.de',
        pass: 'Tom19259!'
    }
});

module.exports = {
    sendmail: function (to, subject, text, html){
        let mailOptions = {
            from: 'info@slickcomm.de',
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("Mail Error: ",error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

