module.exports = function (req, res, next) {
  console.log("got request");
  if (req.isAuthenticated()) {
    req.isLoggedIn = true;
    return next();
  } else {
    // res.redirect('/signin')
    // res.send({"stupid":"ok"});
    res.status(401).send({ isLoggedIn: false });
  }
};
