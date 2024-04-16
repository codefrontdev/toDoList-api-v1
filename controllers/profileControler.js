const { Profile, User, Task } = require("../models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler')





exports.createProfile = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

exports.getProfiles = asyncHandler(async (req, res) => {
    // console.log(req.user);
    
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

//   let filterObject = {};
//   if (req.params.id) filterObject = { category: req.params.categoryId };
    try {
      const profiles = await Profile.findAll({
        include: {
          model: User,
          include: Task
        },
      limit: limit,
      offset: skip,
    });
    res.status(200).json({
      status: "success",
      data: {result: profiles.length, page, data: profiles },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getProfileById = asyncHandler(async (req, res, next) => {
  try {
      const profile = await Profile.findByPk(req.params.id);
      
      if (!profile) { 
          return next(new ApiError(`profile not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateprofile = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });
      
      if (profile == 0) { 
          return next(new ApiError(`profile not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "updated successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteProfile = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.destroy({
      where: {
        id: req.params.id,
      },
    });
      
      
      if (profile == 0) {
          return next(new ApiError(`profile not found with id ${req.params.id}`, 404))
      }
    res.status(200).json({
      status: "deleted successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
