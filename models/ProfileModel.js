const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");
const Task = require("./TaskModel");
const User = require("./UserModel");

const Profile = sequelize.define("profile", {
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


module.exports = Profile;

