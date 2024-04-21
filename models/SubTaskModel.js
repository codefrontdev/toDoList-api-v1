const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");

const SubTask = sequelize.define("subTask", {
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
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = SubTask;
