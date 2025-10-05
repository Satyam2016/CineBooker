const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
