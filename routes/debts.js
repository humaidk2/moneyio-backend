module.exports = function(app, isLoggedIn, Debt) {
  app.post('/debts',isLoggedIn, function(req, res) {
    var type = req.body.type;
    var person = req.body.person;
    var amount = req.body.amount;
    var personID;
    Debt.create({
      type: type, 
      amount: amount, 
      person: person, 
      user_id: req.session.passport.user.id
    })
    .then(function() {
      res.end();
    });
  })
}
