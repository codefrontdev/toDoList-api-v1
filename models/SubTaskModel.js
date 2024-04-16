const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");

const SubTask = sequelize.define("subTask", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activityId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  mainTag: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  subTag: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
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
