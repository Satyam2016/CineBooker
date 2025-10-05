const express = require("express");
const router = express.Router();
const {
  getShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
} = require("../controllers/showController");


router.get("/", getShows);
router.get("/:id", getShowById);
router.post("/", addShow);
router.put("/:id", updateShow);
router.delete("/:id", deleteShow);

module.exports = router;
