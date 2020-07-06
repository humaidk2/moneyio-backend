var path = require('path');
var handler = require('./request-handler');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./app/config');


var session = require('express-session');
var passport = require('passport');

var app = express();

app.use('cookie-parser')();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(handler.check);
app.use(session({
    secret: 'ansfakskcasf',
    resave: false,
    saveUnintialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/currency', handler.currency);
app.post('/transactions', handler.transactions);
app.get('/transactions', handler.getTransactions);
app.post('/debts', handler.debts);
app.get('/debts', handler.getDebts);

module.exports = app;
