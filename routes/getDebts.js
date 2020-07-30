module.exports = function (app, isLoggedIn, Debt) {
  app.get("/debts", isLoggedIn, function (req, res) {
    Debt.findAll({
      where: { user_id: req.session.passport.user.id },
    }).then(function (debts) {
      res
        .status(200)
        .send({ Message: true, debts: debts, isLoggedIn: req.isLoggedIn });
    });
  });
};
