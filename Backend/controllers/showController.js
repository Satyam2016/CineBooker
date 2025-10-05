const db = require("../config/db");


const getShows = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.show_id, s.show_time, m.title AS movie_title, sc.name AS screen_name, c.name AS cinema_name
       FROM shows s
       JOIN movies m ON s.movie_id = m.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id
       JOIN cinemas c ON sc.cinema_id = c.cinema_id`
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching shows" });
  }
};

const getShowById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.show_id, s.show_time, m.title AS movie_title, sc.name AS screen_name, c.name AS cinema_name
       FROM shows s
       JOIN movies m ON s.movie_id = m.movie_id
       JOIN screens sc ON s.screen_id = sc.screen_id
       JOIN cinemas c ON sc.cinema_id = c.cinema_id
       WHERE s.show_id = ?`,
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Show not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching show" });
  }
};


const addShow = async (req, res) => {
  const { movie_id, screen_id, show_time } = req.body;
  try {
    const data = [movie_id, screen_id, show_time];
    await db.query(
      "INSERT INTO shows (movie_id, screen_id, show_time) VALUES (?, ?, ?)",
      data
    );
    res.status(201).json({ message: "Show added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding show" });
  }
};


const updateShow = async (req, res) => {
  const { movie_id, screen_id, show_time } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE shows SET movie_id = ?, screen_id = ?, show_time = ? WHERE show_id = ?",
      [movie_id, screen_id, show_time, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Show not found" });
    res.status(200).json({ message: "Show updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating show" });
  }
};


const deleteShow = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM shows WHERE show_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Show not found" });
    res.status(200).json({ message: "Show deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting show" });
  }
};

module.exports = {
  getShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
};
