const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControler");
const { getWorkspace, getWorkspaceById, updateWorkspace, deleteWorkspace } = require("../controllers/workspaceControler");
const {  verifyAccessToken } = require("../middleware/tokenMiddleware");

const router = require("express").Router();

router.get("/", verifyAccessToken, getWorkspace);
router
  .get("/:id", verifyAccessToken, getWorkspaceById)
  .patch("/:id", verifyAccessToken, updateWorkspace)
  .delete("/:id", verifyAccessToken, deleteWorkspace);

module.exports = router;
