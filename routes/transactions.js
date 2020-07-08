module.exports = function(app, isLoggedIn, Transaction) {
    app.post('/transactions', isLoggedIn, function(req, res) {
        var category = req.body.category;
        var title = req.body.title;
        var amount = req.body.amount;
        // var userID = req.session.user.id;
        console.log('id', req.session.user.id);
        Transaction.create({
            category: category,
            title: title,
            amount: amount,
            user_id: req.session.passport.user.id
        })
        .then(function() {
          res.end();
        });
    })
}
