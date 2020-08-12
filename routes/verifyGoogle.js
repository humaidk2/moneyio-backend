var passport = require("passport");
module.exports = function (app, User) {
  app.get("/verifygoogle", passport.authenticate("custom-google"), function (
    req,
    res
  ) {
    console.log("loggedin");
    // do something with req.user
    res.status(200).send({ username: req.session.passport.user.username });
  });
};
