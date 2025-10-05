const db = require("../config/db");

const getScreens = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM screens");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching screens" });
  }
};


const getScreenById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM screens WHERE screen_id = ?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Screen not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching screen" });
  }
};


const addScreen = async (req, res) => {
  const { cinema_id, name,  status } = req.body;
  try {
    const data = [cinema_id, name];
    await db.query(
      "INSERT INTO screens (cinema_id, name) VALUES (?, ?)",
      data
    );
    res.status(201).json({ message: "Screen added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding screen" });
  }
};


const updateScreen = async (req, res) => {
  const { cinema_id, name, capacity, status } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE screens SET cinema_id = ?, name = ? WHERE screen_id = ?",
      [cinema_id, name, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Screen not found" });
    res.status(200).json({ message: "Screen updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating screen" });
  }
};


const deleteScreen = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM screens WHERE screen_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Screen not found" });
    res.status(200).json({ message: "Screen deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting screen" });
  }
};

module.exports = {
  getScreens,
  getScreenById,
  addScreen,
  updateScreen,
  deleteScreen,
};
