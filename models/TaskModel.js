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
    type: DataTypes.ENUM,
    values: ["low", "medium", "high", "noPriority", "urgent"],
    defaultValue: "noPriority",
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taskTag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["todo", "doing", "testing", "done"],
    defaultValue: "todo",
    allowNull: false,
  },
});

module.exports = Task;
