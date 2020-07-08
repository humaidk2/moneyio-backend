module.exports = function(app, isLoggedIn, Debt) {
    app.get('/debts', isLoggedIn, function(req, res) {
        var param = {};
        console.log('id', req.session.user.id);
        Debt.findAll({
            where: {user_id: req.session.passport.user.id}
        }). then(function(debts){
            res.send(debts);
        });
    })
}

