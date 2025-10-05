const db = require("../config/db");

const getMovies = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM movies");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching movies" });
  }
};


const getMovieById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM movies WHERE movie_id = ?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching movie" });
  }
};


const addMovie = async (req, res) => {
  const { title, description, duration_minutes, release_date, language, genre } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  try {
    const data = [title, description || null, duration_minutes || null, release_date || null, language || null, genre || null];
    await db.query(
      "INSERT INTO movies (title, description, duration_minutes, release_date, language, genre) VALUES (?, ?, ?, ?, ?, ?)",
      data
    );
    res.status(201).json({ message: "Movie added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding movie" });
  }
};


const updateMovie = async (req, res) => {
  const { title, description, duration_minutes, release_date, language, genre } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE movies SET title = ?, description = ?, duration_minutes = ?, release_date = ?, language = ?, genre = ? WHERE movie_id = ?",
      [title, description, duration_minutes, release_date, language, genre, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating movie" });
  }
};


const deleteMovie = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM movies WHERE movie_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting movie" });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
