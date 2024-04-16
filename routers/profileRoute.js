const {
  getProfileById,
  updateprofile,
  deleteProfile,
  getProfiles,
  createProfile,
} = require("../controllers/profileControler");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControler");
const { verifyAccessToken } = require("../middleware/tokenMiddleware");

const router = require("express").Router();

router.post("/", verifyAccessToken, createProfile).get("/", verifyAccessToken, getProfiles);
router
  .get("/:id", verifyAccessToken, getProfileById)
  .patch("/:id", verifyAccessToken, updateprofile)
  .delete("/:id", verifyAccessToken, deleteProfile);

module.exports = router;
