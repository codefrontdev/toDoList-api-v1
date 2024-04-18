const { Task, SubTask, User, UserTask } = require("../models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("express-async-handler");

exports.createTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    if (!task) {
      return next(new ApiError("Could not create task", 400));
    }

    const userTask = await UserTask.create({
      userId: req.body.userId,
      taskId: task.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        task: task,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getTasks = asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 5;
  const skip = (page - 1) * limit;

  try {
    if (page < 1 || limit < 1) {
      throw new Error("page and limit should be positive");
    }

    const tasks = await Task.findAll({
      include: [
        {
          all: true
        },
      ],
      limit: limit,
      offset: skip,
    });

    if (!tasks) {
      throw new Error("Could not find tasks");
    }

    res.status(200).json({
      status: "success",
      data: { result: tasks.length, page, data: tasks },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getTaskById = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return next(new ApiError(`task not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });

    if (task == 0) {
      return next(new ApiError(`task not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
      status: "updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (task == 0) {
      return next(new ApiError(`task not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
      status: "deleted successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
