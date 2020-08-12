module.exports = function (req, res, next) {
  console.log("user");
  console.log(req.session.passport.user);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    req.isLoggedIn = true;
    return next();
  } else {
    res.status(401).send({ isLoggedIn: false });
  }
};
