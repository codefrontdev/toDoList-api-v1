const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");

const Workspace = sequelize.define("workspace", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

});

module.exports = Workspace;
