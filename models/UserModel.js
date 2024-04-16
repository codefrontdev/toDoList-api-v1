const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/postgresql");
const Profile = require("./ProfileModel");
const Task = require("./TaskModel");

// Associations
// User and Profile is one-to-one association, one user has one profile
// User and Task is one-to-many association, one user has many tasks
// Profile and User is many-to-one association, one profile belongs to one user
// Task and User is many-to-many association, one task belongs to many users

const User = sequelize.define("user", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
    },
    unique: true,
  },
  githubId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["admin", "user"],
    defaultValue: "user",
    allowNull: false,
  },
});


module.exports = User;

// User.hasOne(Profile, {
//   through: "userId",
//   foreignKey: {
//     name: "userId",
//     unique: true,
//   },
//   onDelete: "cascade",
// });
// User.hasMany(Task);

// Profile.belongsTo(User, {
//   onDelete: "cascade",
// });
// Task.belongsToMany(User, {as: 'tasks', through: "user_task" });