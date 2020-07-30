var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var isLoggedIn = require("./routes/isLoggedIn");

var session = require("express-session");
var passport = require("passport");
var cors = require("cors");

var app = express();

var Sequelize = require("sequelize");
// var sequelize = new Sequelize({
//   database: '',
//   username: supersecret.dbUser,
//   password: supersecret.dbPassword,
//   host: supersecret.dbHost,
//   dialect: 'mysql'
// });
var sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection established successfully!");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

let User = require("./app/models/user.js");
var Transaction = require("./app/models/Transaction.js");
var Debt = require("./app/models/Debt.js");
User.hasMany(Transaction);
Transaction.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Debt);
Debt.belongsTo(User, {
  foreignKey: "user_id",
});
User.sync({ force: false }).then(function () {
  return;
  User.create({
    username: "admin2",
    email: "test2test@gmail.com",
    password: "admin2",
  });
  return User.create({
    username: "admin",
    email: "testtest@gmail.com",
    password: "admin",
  });
});
Transaction.sync({ force: true })
  .then(function () {
    return;
    // return Transaction.create({
    //   category: "car",
    //   title: "car repairing",
    //   amount: 53.4,
    //   date:  new Date(Date.UTC(2016, 0, 1)),
    //   user_id: 1
    // });
  })
  .catch((error) => {
    console.log("error with transaction");
    console.log(error);
  });
Debt.sync({ force: true }).then(function () {
  return;
  // return Debt.create({
  //   type: 'entertainment',
  //   personOwed: 1,
  //   amount: 50,
  //   date:  new Date(Date.UTC(2016, 0, 1)),
  //   user_id: 2
  // });
});
require("./config/passport")(passport, User); //pass passport for configuration

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ansfakskcasf",
    resave: false,
    saveUnintialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/currency")(app, isLoggedIn);
require("./routes/debts")(app, isLoggedIn, Debt);
require("./routes/getDebts")(app, isLoggedIn, Debt);
require("./routes/deleteDebts")(app, isLoggedIn, Debt);
require("./routes/getTransactions")(app, isLoggedIn, Transaction);
require("./routes/deleteTransactions")(app, isLoggedIn, Transaction);
require("./routes/logout")(app, isLoggedIn);
require("./routes/signin")(app, passport);
require("./routes/signup")(app, passport);
require("./routes/transactions")(app, isLoggedIn, Transaction);
require("./routes/verifyEmail")(app, User);

module.exports = app;
