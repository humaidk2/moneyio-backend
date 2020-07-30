module.exports = function (app, passport) {
  app.post("/signin", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (!user) {
        info.isLoggedIn = false;
        res.send(info);
      } else {
        req.logIn(user, function () {
          return res.status(200).send({ Message: true, isLoggedIn: true });
        });
      }
    })(req, res, next);
  });
};
