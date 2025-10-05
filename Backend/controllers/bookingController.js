const db = require("../config/db");


const getUserBookings = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT 
          b.booking_id, 
          u.name AS user_name, 
          u.email AS user_email, 
          s.show_id, 
          m.title AS movie_title, 
          m.language AS movie_language,
          m.genre AS movie_genre,
          m.duration_minutes,
          sc.name AS screen_name, 
          c.name AS cinema_name,
          c.location AS cinema_location,
          s.show_time,
          b.status, 
          b.booked_at
       FROM bookings b
       JOIN users u ON b.user_id = u.user_id
       JOIN shows s ON b.show_id = s.show_id
       JOIN movies m ON s.movie_id = m.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id
       JOIN cinemas c ON sc.cinema_id = c.cinema_id
       WHERE b.user_id = ?
       ORDER BY b.booked_at DESC`,
      [user_id]
    );

    for (let booking of rows) {
      const [seats] = await db.query(
        `SELECT 
            
            CONCAT(CHAR(64 + st.row_numbe), st.column_number) AS seat_number
         FROM booking_seats bs
         JOIN seats st ON bs.seat_id = CONCAT(CHAR(64 + st.row_numbe), st.column_number)
         WHERE bs.booking_id = ?
         ORDER BY st.row_numbe, st.column_number`,
        [booking.booking_id]
      );
      booking.seats = seats;
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user bookings" });
  }
};

const getBookings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
          b.booking_id, 
          u.name AS user_name, 
          u.email AS user_email, 
          s.show_id, 
          m.title AS movie_title, 
          sc.name AS screen_name, 
          b.status, 
          b.booked_at,
          JSON_ARRAYAGG(
            JSON_OBJECT('seat_id', st.seat_id, 'row', st.row_numbe, 'column', st.column_number)
          ) AS seats
       FROM bookings b
       JOIN users u ON b.user_id = u.user_id
       JOIN shows s ON b.show_id = s.show_id
       JOIN movies m ON s.movie_id = m.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id
       LEFT JOIN booking_seats bs ON b.booking_id = bs.booking_id
       LEFT JOIN seats st ON bs.seat_id = st.seat_id
       GROUP BY b.booking_id`
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

    const [result] = await db.query(
      "INSERT INTO bookings (user_id, show_id) VALUES (?, ?)",
      [user_id, show_id]
    );
    const booking_id = result.insertId;

    if (seat_ids.length > 0) {
      const values = seat_ids.map(id => [booking_id, id]);
      await db.query(
        "INSERT INTO booking_seats (booking_id, seat_id) VALUES ?",
        [values]
      );
    }

    res.status(201).json({ message: "Booking added successfully!", booking_id });
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

const getBookedSeats = async (req, res) => {
  const show_id = req.params.showId;
  try {
    console.log("Fetching booked seats for show_id:", show_id);
   const [rows] = await db.query(
  `SELECT bs.seat_id AS seat_label
FROM booking_seats bs
JOIN seats s 
  ON bs.seat_id = CONCAT(CHAR(64 + s.row_numbe), s.column_number)
JOIN bookings b 
  ON bs.booking_id = b.booking_id
WHERE b.show_id = ? AND b.status = 'CONFIRMED'`,
  [show_id]
);
    const seatLabels = rows.map(r => r.seat_label); 
    console.log("Fetched booked seats from DB:", seatLabels);
    res.status(200).json(seatLabels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching booked seats" });
  }
};



module.exports = {
  getBookings,
  getUserBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
  getBookedSeats
};