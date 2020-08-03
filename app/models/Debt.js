var Sequelize = require("sequelize");

//var sequelize = new Sequelize(process.env.DATABASE_URL);
var sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});
var Debt = sequelize
  .define(
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
  )
  .catch((error) => {
    console.log(error);
  });

module.exports = Debt;
