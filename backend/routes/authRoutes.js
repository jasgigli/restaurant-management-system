const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/register", protect, authorize("SuperAdmin"), register);
router.post("/login", login);

module.exports = router;
