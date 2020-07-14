
module.exports = function(app, isLoggedIn, Transaction) {
    app.get('/transactions', isLoggedIn, function(req, res) {
        var param = {};
        console.log("ok");

        console.log('id', req.session.passport.user.id);
        Transaction.findAll({
            where: {user_id: req.session.passport.user.id}
        }).then(function(transactions) {
            if(!transactions) {
                res.status(404).send({'Message': "No transactions here"});
            }
            res.send(transactions);
        })
    })
}
