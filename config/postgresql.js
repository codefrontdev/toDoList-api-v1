const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toDoListDB", "postgres", "0000", {
  host: "localhost",
  dialect: "postgres",
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
