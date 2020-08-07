var jwt = require("jsonwebtoken");

var passport = require("passport");
module.exports = function (app, User) {
  app.get("/verifyGoogle", passport.authenticate("custom-google"), function (
    req,
    res
  ) {
    // do something with req.user
    res.status(200).send({ username: req.session.passport.user.username });
  });
};
