
module.exports = function(app, isLoggedIn, Transaction) {
    app.get('/transactions', isLoggedIn, function(req, res) {
        Transaction.findAll({
            where: {user_id: req.session.passport.user.id}
        }).then(function(transactions) {
            console.log("hello");
            res.status(200).send({"Message": true, transactions: transactions});
        })
    })
}
