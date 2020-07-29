module.exports = function (app, isLoggedIn, Debt) {
  app.post("/deleteDebts", isLoggedIn, function (req, res) {
    Debt.destroy({
      where: { user_id: req.session.passport.user.id, id: req.body.id },
    }).then(function (debts) {
      res.status(200).send({ Message: true, id: req.body.id });
    });
  });
};
