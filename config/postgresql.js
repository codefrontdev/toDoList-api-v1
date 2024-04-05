const { Sequelize } = require("sequelize");

const connection = async () => {
  try {
    const sequelize = new Sequelize("toDoListDB", "postgres", "0000", {
      host: "localhost",
      dialect: "postgres",
    });
    // console.log(sequelize);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
