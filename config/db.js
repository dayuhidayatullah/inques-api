require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = process.env.INQUES_URL
  ? new Sequelize(process.env.INQUES_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "127.0.0.1",
        dialect: "mysql",
        dialectOptions: {
          decimalNumbers: true,
        },
        password: "test123",
      }
    );

module.exports = sequelize;
