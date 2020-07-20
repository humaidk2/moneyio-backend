module.exports = function (app, isLoggedIn, Debt) {
  app.post("/debts", isLoggedIn, function (req, res) {
    var type = req.body.type;
    var person = req.body.person;
    var amount = req.body.amount;
    var description = req.body.description;
    console.log("cmon");
    Debt.create({
      type: type,
      amount: amount,
      person: person,
      description: description,
      user_id: req.session.passport.user.id,
    }).then(function () {
      res.end();
    });
  });
};
