var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

var jwt = require("jsonwebtoken");
var passport = require("passport");
var CustomGoogleStrategy = require("./verifyGooglePassport");

module.exports = function (passport, User) {
  // serialize and deserialize users for sessions
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (username, done) {
    User.findOne({ username: username }).then(function (user) {
      done(null, user);
    });
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: `${process.env.MAIL_LINK}/auth/facebook/callback`,
        // profileFields: ['id', 'displayName'],
        // enableProof: true
      },
      function (accessToken, refreshToken, profile, cb) {
        var user = { oAuthID: profile.id, username: profile.displayName };
        User.findOrCreate({
          where: {
            oAuthID: profile.id,
          },
          defaults: {
            username: profile.displayName,
            active: true,
          },
        })
          .then(function (user) {
            return cb(null, user);
          })
          .catch(function (err) {
            return cb(err, null);
          });
      }
    )
  );
  passport.use(
    "custom-google",
    new CustomGoogleStrategy({}, function (req, payload, cb) {
      User.findOrCreate({
        where: {
          oAuthID: payload.sub,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          active: true,
        },
      })
        .then(function (user) {
          return cb(null, user[0]);
        })
        .catch(function (err) {
          return cb(err, null);
        });
    })
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        User.findOne({ where: { username: username } }).then(function (user) {
          if (!user) {
            return done(null, false, { message: "Invalid username." });
          }
          var hash = user.dataValues.password;
          if (!User.validPassword(password, hash)) {
            return done(null, false, { message: "Invalid password." });
          }
          if (!user.dataValues.active) {
            return done(null, false, {
              message:
                "Please activate your account by following the instructions in the account confirmation email you received to proceed.",
            });
          }
          // login success
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        User.findOne({ where: { username: username } })
          .then(function (user) {
            if (user) {
              return done(null, false, { message: "Username already exists." });
            } else if (!user) {
              var unique = {
                username: req.body.username,
                email: req.body.email,
              };
              var token = jwt.sign({ unique }, process.env.JWT_SECRET, {
                expiresIn: "2d", // expires in 2 days
              });
              User.create({
                username: username,
                email: req.body.email,
                password: User.generateHash(password),
                token: token,
              })
                .then(function (user, test) {
                  //signup success
                  return done(null, user);
                })
                .catch(function (err) {
                  return done(err);
                });
            }
          })
          .catch(function (err) {
            return done(err);
          });
      }
    )
  );
};
