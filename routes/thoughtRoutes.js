const router = require("express").Router();
const {
  getThoughts,
  postThought,
} = require("../controllers/thoughtController");
const { protect } = require("../middleware/authMiddleware");

router.get("/get-thoughts", protect, getThoughts);
router.post("/post-thought", protect, postThought);

module.exports = router;
