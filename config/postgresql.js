const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("toDoListDB", "postgres", "0000", {
  dialect: "postgres",
  port: 5432,
  host: "localhost",
  logging: false
});

sequelize.sync({ force: false, alter: true });
const connection = async () => {
  try {
    // console.log(sequelize);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connection, sequelize };
