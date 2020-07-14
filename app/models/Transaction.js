var Sequelize = require('sequelize');
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
    }
}, {
    freezeTableName: true
});
// Transaction.sync({force: true}).then(function () {
//     return;
//     // return Transaction.create({
//     //   category: "car",
//     //   title: "car repairing",
//     //   amount: 53.4,
//     //   date:  new Date(Date.UTC(2016, 0, 1)),
//     //   user_id: 1
//     // });
//   }).catch((error)=>{
//     console.log("error with transaction");
//     console.log(error);
// });

module.exports = Transaction