const db = require("../config/db");

const getDashboardSummary = async (req, res) => {
  try {
    const [cinemas] = await db.query("SELECT COUNT(*) AS totalCinemas FROM cinemas");
    const [screens] = await db.query("SELECT COUNT(*) AS totalScreens FROM screens");
    const [movies] = await db.query(
      "SELECT COUNT(*) AS activeMovies FROM movies WHERE release_date <= CURDATE()"
    );
    
    const [bookings] = await db.query(
      "SELECT COUNT(*) AS bookingsToday FROM bookings WHERE DATE(booked_at) = CURDATE()"
    );

    res.status(200).json({
      totalCinemas: cinemas[0].totalCinemas,
      totalScreens: screens[0].totalScreens,
      activeMovies: movies[0].activeMovies,
      bookingsToday: bookings[0].bookingsToday,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard summary" });
  }
};

module.exports = { getDashboardSummary };
