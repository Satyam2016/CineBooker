const db  = require("../config/db");


const getCinemas = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cinemas");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cinemas" });
  }
};

const getCinemaById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cinemas WHERE cinema_id = ?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Cinema not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cinema" });
  }
};

const addCinema = async (req, res) => {
  const { name, location } = req.body;
  try {
    const query = "INSERT INTO cinemas (name, location) VALUES (?, ?)";
    await db.query(query, [name, location]);
    res.status(201).json({ message: "Cinema added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding cinema" });
  }
};


const updateCinema = async (req, res) => {
  const { name, location } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE cinemas SET name = ?, location = ? WHERE cinema_id = ?",
      [name, location, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cinema not found" });
    res.status(200).json({ message: "Cinema updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating cinema" });
  }
};


const deleteCinema = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM cinemas WHERE cinema_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cinema not found" });
    res.status(200).json({ message: "Cinema deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting cinema" });
  }
};


const getMoviesByCinema = async (req, res) => {
  const { cinemaId } = req.params;

  try {
    // Fetch movies along with show info for the given cinema
    const [rows] = await db.query(
      `SELECT 
         m.movie_id AS movieId,
         m.title,
         m.description,
         m.duration_minutes AS duration,
         m.release_date AS releaseDate,
         m.language,
         m.genre,
         s.show_id AS showId,
         sc.name AS screen,
         s.show_time AS showTime
       FROM movies m
       JOIN shows s ON m.movie_id = s.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id
       WHERE sc.cinema_id = ?`,
      [cinemaId]
    );

    // Transform rows into movies with nested showtimes
    const moviesMap = {};

    rows.forEach((row) => {
      if (!moviesMap[row.movieId]) {
        moviesMap[row.movieId] = {
          id: row.movieId,
          title: row.title,
          description: row.description,
          duration: row.duration,
          releaseDate: row.releaseDate,
          language: row.language,
          genre: row.genre,
          showtimes: [],
        };
      }

      moviesMap[row.movieId].showtimes.push({
        showId: row.showId,
        screen: row.screen,
        showTime: row.showTime,
      });
    });

    res.status(200).json(Object.values(moviesMap));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching movies for cinema" });
  }
};


module.exports = {
  getCinemas,
  getCinemaById,
  addCinema,
  updateCinema,
  deleteCinema,
  getMoviesByCinema,
};
