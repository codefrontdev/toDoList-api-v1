const {Workspace} = require("../models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler')

exports.getWorkspace = asyncHandler(async (req, res) => {
    
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

//   let filterObject = {};
//   if (req.params.id) filterObject = { category: req.params.categoryId };
    try {
    const workspace = await Workspace.findAll({
      limit: limit,
      offset: skip,
    });
    res.status(200).json({
      status: "success",
      data: {result: workspace.length, page, data: workspace },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getWorkspaceById = asyncHandler(async (req, res, next) => {
  try {
      const workspace = await Workspace.findByPk(req.params.id);
      
      if (!workspace) { 
          return next(new ApiError(`workspace not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "success",
      data: workspace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateWorkspace = asyncHandler(async (req, res, next) => {
  try {
    const workspace = await Workspace.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });
      
      if (workspace == 0) { 
          return next(new ApiError(`workspace not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "updated successfully",
      data: workspace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteWorkspace = asyncHandler(async (req, res, next) => {
  try {
    const workspace = await Workspace.destroy({
      where: {
        id: req.params.id,
      },
    });
      
      
      if (workspace == 0) {
          return next(new ApiError(`workspace not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "deleted successfully",
      data: workspace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
