const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/postgresql");
const Task = require("./TaskModel");
const User = require("./UserModel");

const Profile = sequelize.define("profile", {
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  speciality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,

    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["male", "female"],
    defaultValue: "male",
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});


module.exports = Profile;

