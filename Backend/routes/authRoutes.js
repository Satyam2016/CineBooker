const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getLoggedInUser } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getLoggedInUser);

module.exports = router;