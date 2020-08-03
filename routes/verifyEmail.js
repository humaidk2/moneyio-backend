var jwt = require("jsonwebtoken");
module.exports = function (app, User) {
  app.get("/verifyemail", function (req, res) {
    var token = req.query.unique;
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return "Sorry, your link is no longer valid. Please verify link within 2 days of signup.";
      } else {
        var username = decoded.unique.username;
        var email = decoded.unique.email;
        User.findOne({
          where: { username: username, email: email, token: token },
        }).then(function (user) {
          if (!user) {
            res.send(
              "Sorry, your link is no longer valid. Please verify link within 2 days of signup."
            );
          } else {
            user.update({ active: true });
            res.status(200).send({});
          }
        });
      }
    });
  });
};
