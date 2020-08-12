module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    req.isLoggedIn = true;
    return next();
  } else {
    res.status(401).send({ isLoggedIn: false });
  }
};
