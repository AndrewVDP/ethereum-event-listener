const nodemailer = require('nodemailer');

const mail = (event) => {
  nodemailer.createTestAccount((err, account) => {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'polypolymathmath@gmail.com', // generated ethereal user
        pass: 'peterpiper'  // generated ethereal password
      }
    });

    let mailOptions = {
      from: '"Johnny Utah" <polpolymathmath@gmail.com>', // sender address
      to: 'devops@polymath.network', // list of receivers
      subject: 'event listener', // Subject line
      text: event // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', JSON.stringify(info));

    });
  });
}

exports.mail = mail;
