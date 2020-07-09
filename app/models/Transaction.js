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
var Transaction = sequelize.define('Transaction', {
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


module.exports = Transaction