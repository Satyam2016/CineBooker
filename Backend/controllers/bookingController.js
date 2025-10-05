const db = require("../config/db");


const getBookings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.booking_id, u.name AS user_name, u.email AS user_email, 
              s.show_id, m.title AS movie_title, sc.name AS screen_name, b.status, b.booked_at
       FROM bookings b
       JOIN users u ON b.user_id = u.user_id
       JOIN shows s ON b.show_id = s.show_id
       JOIN movies m ON s.movie_id = m.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id`
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.booking_id, u.name AS user_name, u.email AS user_email, 
              s.show_id, m.title AS movie_title, sc.name AS screen_name, b.status, b.booked_at
       FROM bookings b
       JOIN users u ON b.user_id = u.user_id
       JOIN shows s ON b.show_id = s.show_id
       JOIN movies m ON s.movie_id = m.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id
       WHERE b.booking_id = ?`,
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching booking" });
  }
};


const addBooking = async (req, res) => {
  const { user_id, show_id, seat_ids } = req.body; 
  try {
    // Add booking
    const [result] = await db.query(
      "INSERT INTO bookings (user_id, show_id) VALUES (?, ?)",
      [user_id, show_id]
    );
    const booking_id = result.insertId;

    // Map booking seats
    for (const seat_id of seat_ids) {
      await db.query(
        "INSERT INTO booking_seats (booking_id, seat_id) VALUES (?, ?)",
        [booking_id, seat_id]
      );
    }

    res.status(201).json({ message: "Booking added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding booking" });
  }
};


const updateBooking = async (req, res) => {
  const { status } = req.body; 
  try {
    const [result] = await db.query(
      "UPDATE bookings SET status = ? WHERE booking_id = ?",
      [status, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating booking" });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM bookings WHERE booking_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting booking" });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
};
