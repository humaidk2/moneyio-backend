var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASS
  }
});

module.exports = function(app, passport) {
    app.post('/signup', function(req, res) {
        passport.authenticate('local-signup', function(err, user, info, status) {
            if (err) {
              return next(err);
            } else if (!user) {
              res.send(info);
            } else {
      
            // send Email
            var mailOptions = {
            from: '"Blinky" <communication.vrpacman@gmail.com>',
            to: user.email,
            subject: 'Confirm registration for VR Pacman',
            text: `Hi ${user.username}!\n\nPlease verify your account by clicking the following link: ${supersecret.link}/verifyemail?unique=${user.token}\n\nIf you believe you have received this email in error, please ignore this email.`
            };
    
            transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent:', info.messageId, info.response);
            })
      
      
            res.end();
            }
        })(req, res, next);
    })
}

