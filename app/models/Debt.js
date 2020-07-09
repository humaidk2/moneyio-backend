var Sequelize = require('sequelize');
var supersecret = require('../../config/config');
//var sequelize = new Sequelize(process.env.DATABASE_URL); 
var sequelize = new Sequelize({
    database: process.env.DB_NAME, 
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }); 
var Debt = sequelize.define('Debt', {
    type: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 255]
        }
    },
    personOwed: {
        type: Sequelize.INTEGER,
        references: 'User',
        referencesKey: 'id'
    },
    amount: {
        type: Sequelize.FLOAT,
    },
    date: {
        type: Sequelize.DATE,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: 'User',
        referencesKey: 'id'
    }
}, {
    freezeTableName: true
})

// // force: true will drop the table if it already exists
// User.sync({force: true}).then(function () {
//     return User.create({
//         username: 'admin',
//         email: 'testtest@gmail.com',
//         password: 'admin'
//     });
// });
module.exports = Debt