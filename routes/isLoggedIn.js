module.exports = function(req, res, next) {
    console.log("got request");
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/signin')
        // res.send({"stupid":"ok"});
    }
}