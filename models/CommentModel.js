const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");

const Comment = sequelize.define("comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Comment;
