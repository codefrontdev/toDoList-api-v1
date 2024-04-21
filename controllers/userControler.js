
const { User, Task } = require("../models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler')

exports.getUsers = asyncHandler(async (req, res) => {
    console.log(req.user);
    
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

//   let filterObject = {};
//   if (req.params.id) filterObject = { category: req.params.categoryId };
    try {
      const users = await User.findAll({
        attributes: ['id', 'fullName', 'email'],
        include: {
          all: true,
        },
      limit: limit,
      offset: skip,
    });
    res.status(200).json({
      status: "success",
      data: {result: users.length, page, data: users },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
        include: {
            all: true
        }
      });
      
      if (!user) { 
          return next(new ApiError(`User not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  try {

    const exitUser = await User.findOne({ where: { id: req.params.id } })
    
    console.log(exitUser);
    if (!exitUser) { 
        return next(new ApiError(`User not found with id ${req.params.id}`, 404))
  }

    const user = await User.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });
    
    if (user == 0) {
        return next(new ApiError(`id or your data is not correct`, 404))
    }
    
    res.status(200).json({
      status: "updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
      
      
      if (user == 0) {
          return next(new ApiError(`User not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
