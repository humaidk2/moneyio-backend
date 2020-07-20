var Sequelize = require("sequelize");

//var sequelize = new Sequelize(process.env.DATABASE_URL);
var sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});
var Debt = sequelize.define(
  "Debt",
  {
    person: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.FLOAT,
    },
    date: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

// // force: true will drop the table if it already exists
// User.sync({force: true}).then(function () {
//     return User.create({
//         username: 'admin',
//         email: 'testtest@gmail.com',
//         password: 'admin'
//     });
// });
// Debt.sync({force: true}).then(function () {
//     return;
//     // return Debt.create({
//     //   type: 'entertainment',
//     //   personOwed: 1,
//     //   amount: 50,
//     //   date:  new Date(Date.UTC(2016, 0, 1)),
//     //   user_id: 2
//     // });
//   });
module.exports = Debt;
