var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var isLoggedIn = require("./routes/isLoggedIn");

var session = require("express-session");
var passport = require("passport");
var cors = require("cors");
const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on("subscribe", console.log);
redisClient.on("error", console.error);

var app = express();

var Sequelize = require("sequelize");

var sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function (err) {})
  .catch(function (err) {});

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
// force: true will drop the table if it already exists
User.sync({ force: false }).then(function () {
  return;
});
Transaction.sync({ force: false })
  .then(function () {
    return;
  })
  .catch((error) => {});
Debt.sync({ force: false })
  .then(function () {
    return;
  })
  .catch((error) => {
    console.log(error);
  });

require("./config/passport")(passport, User); //pass passport for configuration

app.use(
  cors({
    origin: process.env.MONEY_CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var sessionOptions = {
  store: new RedisStore({ client: redisClient }),
  secret: "ansfakskcasf",
  resave: false,
  saveUninitialized: false,
  cookie: {},
};
if (process.env.TYPE === "PRODUCTION") {
  app.set("trust proxy", 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
  sessionOptions.cookie.sameSite = "none";
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

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
require("./routes/verifyGoogle")(app, User);

module.exports = app;
