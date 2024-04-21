const {SubTask} = require("../models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler')






exports.createSubTask = asyncHandler(async (req, res, next) => {
  try {
    const subTask = await SubTask.create(req.body);
    res.status(201).json({
      status: "success",
      data: subTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



exports.getsubTask = asyncHandler(async (req, res) => {
    console.log(req.SubTask);
    
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

//   let filterObject = {};
//   if (req.params.id) filterObject = { category: req.params.categoryId };
    try {
      const subTask = await SubTask.findAll({
        // attributes: ['id', 'title', 'description', 'status'],
        // include: {
        //   all: true,
        //   nested: true
        // },
      limit: limit,
      offset: skip,
    });
    res.status(200).json({
      status: "success",
      data: {result: subTask.length, page, data: subTask },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getSubTaskById = asyncHandler(async (req, res, next) => {
  try {
    const subTask = await SubTask.findByPk(req.params.id, {
        include: {
          all: true, 
          nested: true
        }
      });
      
      if (!subTask) { 
          return next(new ApiError(`SubTask not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "success",
      data: subTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateSubTask = asyncHandler(async (req, res, next) => {
  try {
    const subTask = await SubTask.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });
      
      if (subTask == 0) { 
          return next(new ApiError(`SubTask not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "updated successfully",
      data: subTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteSubTask = asyncHandler(async (req, res, next) => {
  try {
    const subTask = await SubTask.destroy({
      where: {
        id: req.params.id,
      },
    });
      
      
      if (subTask == 0) {
          return next(new ApiError(`SubTask not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "deleted successfully",
      data: subTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
