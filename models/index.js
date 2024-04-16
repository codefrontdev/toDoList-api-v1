const { sequelize } = require("../config/postgresql");
const Comment = require("./CommentModel");
const Profile = require("./ProfileModel");
const SubTask = require("./SubTaskModel");
const Task = require("./TaskModel");
const User = require("./UserModel");
const Workspace = require("./WorkspaceModel");
const UserTask = sequelize.define("user_task");

User.hasOne(Profile);
User.hasMany(Task);
User.hasMany(Comment);
User.hasMany(SubTask);
User.hasMany(Workspace);

Comment.belongsTo(User);
Profile.belongsTo(User);
Task.belongsToMany(User, { through: UserTask });
SubTask.belongsToMany(User, { through: "user_subtask" });
Workspace.belongsToMany(User, { through: "user_workspace" });

Task.hasMany(Comment);
Task.hasMany(SubTask);

Comment.belongsTo(Comment);
SubTask.belongsTo(Task);

module.exports = { Profile, Task, User, Comment, SubTask, Workspace, UserTask };
