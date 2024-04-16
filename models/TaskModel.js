const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");
const User = require("./UserModel");
const SubTask = require("./SubTaskModel");

const Task = sequelize.define("task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


module.exports = Task;

