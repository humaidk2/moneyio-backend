var request = require('request');

module.exports = function(app, isLoggedIn) {
  app.get('/currency', isLoggedIn, function(req, res) {
    request.get({url: 'http://api.fixer.io/latest?base=USD'}, function(error, response, body) {
      if (!error) {
        res.send(JSON.parse(body));
      } else {
        console.log('error');
      }
    });
  })
}
