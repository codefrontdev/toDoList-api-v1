const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControler");
const {  verifyAccessToken } = require("../middleware/tokenMiddleware");

const router = require("express").Router();

router.get("/", getUsers);
router
  // .get("/:id", verifyAccessToken, getUserById)
  // .patch("/:id", verifyAccessToken, updateUser)
  // .delete("/:id", verifyAccessToken, deleteUser);

module.exports = router;
