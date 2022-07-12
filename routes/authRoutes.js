const router = require("express").Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update-profile", protect, updateUser);
router.get("/get-profile", protect, getUser);

module.exports = router;
