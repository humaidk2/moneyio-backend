const isLoggedIn = require("./isLoggedIn");

module.exports = function (app, isLoggesIn) {
  app.get("/logout", isLoggedIn, function (req, res) {
    req.logout();
    res.status(200).send({ isLoggedIn: req.isLoggedIn });
    // res.redirect("/");
  });
};
