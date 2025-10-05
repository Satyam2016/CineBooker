const express = require("express");
const router = express.Router();
const { getDashboardSummary } = require("../controllers/adminController");

router.get("/", getDashboardSummary);

module.exports = router;
