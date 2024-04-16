const {Comment} = require("../models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("express-async-handler");

exports.getComments = asyncHandler(async (req, res) => {

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  //   let filterObject = {};
  //   if (req.params.id) filterObject = { category: req.params.categoryId };
  try {
    const comments = await Comment.findAll({
      limit: limit,
      offset: skip,
    });
    res.status(200).json({
      status: "success",
      data: { result: comments.length, page, data: comments },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getCommentById = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return next(
        new ApiError(`Comment not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });

    if (comment == 0) {
      return next(
        new ApiError(`Comment not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "updated successfully",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (comment == 0) {
      return next(
        new ApiError(`Comment not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "deleted successfully",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
