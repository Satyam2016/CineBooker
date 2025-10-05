const express = require("express");
const router = express.Router();
const {
  getUserBookings,
  getBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
  getBookedSeats,
} = require("../controllers/bookingController");

router.get("/:user_id/bookings", getUserBookings);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/:showId/booked-seats", getBookedSeats);

module.exports = router;
