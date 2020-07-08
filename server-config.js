var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var isLoggedIn = require('./routes/isLoggedIn');
var supersecret = require('./config/config');




var session = require('express-session');
var passport = require('passport');

var app = express();

var Sequelize = require('sequelize');
// var sequelize = new Sequelize({
//   database: '', 
//   username: supersecret.dbUser, 
//   password: supersecret.dbPassword,
//   host: supersecret.dbHost,
//   dialect: 'mysql'
// }); 
var sequelize = new Sequelize('')


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection established successfully!');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

require('./config/passport')(passport); //pass passport for configuration


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'ansfakskcasf',
    resave: false,
    saveUnintialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

var Transaction = require('./app/models/Transaction');
var Debt = require('./app/models/Debt');
require('./routes/currency')(app, isLoggedIn);
require('./routes/debts')(app, isLoggedIn, Debt);
require('./routes/getDebts')(app, isLoggedIn, Debt);
require('./routes/getTransactions')(app, isLoggedIn, Transaction);
require('./routes/logout')(app);
require('./routes/signin')(app, passport);
require('./routes/signup')(app, passport);
require('./routes/transactions')(app, isLoggedIn, Transaction);



module.exports = app;
