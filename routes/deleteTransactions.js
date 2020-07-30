module.exports = function (app, isLoggedIn, Transaction) {
  app.post("/deleteTransactions", isLoggedIn, function (req, res) {
    Transaction.destroy({
      where: { user_id: req.session.passport.user.id, id: req.body.id },
    }).then(function () {
      res
        .status(200)
        .send({ Message: true, id: req.body.id, isLoggedIn: req.isLoggedIn });
    });
  });
};
