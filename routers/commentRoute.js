const {
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  createComment,
} = require("../controllers/commentControler");
const { verifyAccessToken } = require("../middleware/tokenMiddleware");

const router = require("express").Router();

router
  .get("/", verifyAccessToken, getComments)
  .post("/", verifyAccessToken, createComment);
router
  .get("/:id", verifyAccessToken, getCommentById)
  .patch("/:id", verifyAccessToken, updateComment)
  .delete("/:id", verifyAccessToken, deleteComment);

module.exports = router;

// Socketslient.emit("comment", {
//   taskId: 1,
//   createdBy: 1,

// })
// Socket.on("comment", (body) => {
//   co
// })
