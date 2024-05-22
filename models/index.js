const { sequelize } = require("../config/postgresql");
const Comment = require("./CommentModel");
const Profile = require("./ProfileModel");
const SubTask = require("./SubTaskModel");
const Task = require("./TaskModel");
const User = require("./UserModel");
const Workspace = require("./WorkspaceModel");
const user_task = sequelize.define("user_task");
const user_workspace = sequelize.define("user_workspace");
const comment_like = sequelize.define("comment_like", {}, {timestamps: false});
const subtask_like = sequelize.define("subtask_like");
const task_subtask = sequelize.define("task_subtask");
const workspace_task = sequelize.define("workspace_task");
const task_user_tag = sequelize.define("task_user_tag");
const workspace_user_tag = sequelize.define("workspace_user_tag");
const subtask_user_tag = sequelize.define("subtask_user_tag");

// Many to many relationship for User and Task, Workspace, Comment, SubTask
User.belongsToMany(Task, { through: user_task, foreignKey: "userId" });
User.belongsToMany(Workspace, {
  through: user_workspace,
  foreignKey: "userId",
});
User.belongsToMany(Comment, { through: comment_like, foreignKey: "userId" });
User.belongsToMany(SubTask, { through: subtask_like, foreignKey: "userId" });

Task.belongsToMany(User, { through: user_task, foreignKey: "taskId" });
Workspace.belongsToMany(User, {
  through: user_workspace,
  foreignKey: "workspaceId",
});
Comment.belongsToMany(User, { through: comment_like, foreignKey: "commentId" });
SubTask.belongsToMany(User, { through: subtask_like, foreignKey: "subtaskId" });

// Task has one or more workspaces
Task.belongsToMany(Workspace, {
  through: workspace_task,
  foreignKey: "taskId",
});
Workspace.belongsToMany(Task, {
  through: workspace_task,
  foreignKey: "taskId",
});

// SubTask has one or more Tasks
Task.belongsToMany(SubTask, { through: task_subtask, foreignKey: "subtaskId" });
SubTask.belongsToMany(Task, { through: task_subtask, foreignKey: "subtaskId" });

// Relationship between Task and Comment and createdByUser
Task.hasMany(Comment, { foreignKey: "taskId" });
Comment.belongsTo(Task, { foreignKey: "taskId" });
User.hasMany(Comment, { foreignKey: "createdBy" });
Comment.belongsTo(User, { foreignKey: "createdBy" });

// Relationship between SubTask and Comment and createdBy and between workspace and comment and createdBy
SubTask.hasMany(Comment, { foreignKey: "subtaskId" });
Comment.belongsTo(SubTask, { foreignKey: "subtaskId" });
User.hasMany(Comment, { foreignKey: "createdBy" });
Comment.belongsTo(User, { foreignKey: "createdBy" });

Workspace.hasMany(Comment, { foreignKey: "workspaceId" });
Comment.belongsTo(Workspace, { foreignKey: "workspaceId" });
User.hasMany(Comment, { foreignKey: "createdBy" });
Comment.belongsTo(User, { foreignKey: "createdBy" });

// Tags - many-to-many relationships
Task.belongsToMany(User, { through: task_user_tag, foreignKey: "taskId" });
SubTask.belongsToMany(User, {
  through: subtask_user_tag,
  foreignKey: "subtaskId",
});
Workspace.belongsToMany(User, {
  through: workspace_user_tag,
  foreignKey: "workspaceId",
});

module.exports = {
  Profile,
  Task,
  User,
  Comment,
  SubTask,
  Workspace,
  user_task,
  user_workspace,
  comment_like,
  subtask_like,
  task_subtask,
  workspace_task,
  task_user_tag,
  workspace_user_tag,
  subtask_user_tag,
};
