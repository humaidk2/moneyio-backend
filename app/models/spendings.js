var Sequelize = require('sequelize');
var supersecret = require('../../config/config');
var sequelize = new Sequelize({
    database:'PacmanVR', 
    username: 'root', 
    password: supersecret.dbPassword,
    host: 'localhost',
    dialect: 'mysql'
 }); 
  
var Spendings = sequelize.define('Spending', {
    category: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 255]
        }
    },
    title: {
        type: Sequelize.STRING,
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
module.exports = Spendings