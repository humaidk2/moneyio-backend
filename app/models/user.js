var Sequelize = require('sequelize');
var supersecret = require('../../config/config');
//var sequelize = new Sequelize(process.env.DATABASE_URL);  
var sequelize = new Sequelize({
  database: 'MoneyIo', 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  host: process.env.DB_NAME,
  dialect: 'mysql'
}); 
var bcrypt = require('bcrypt');


var User = sequelize.define('User', {
  oAuthID: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 20]
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: null,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [1, 255]
    }
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: null
  }
}, {
  freezeTableName: true,
});

User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  User.validPassword = function(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
  

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  return User.create({
    username: 'admin',
    email: 'testtest@gmail.com',
    password: 'admin'
  });
});

module.exports = User;