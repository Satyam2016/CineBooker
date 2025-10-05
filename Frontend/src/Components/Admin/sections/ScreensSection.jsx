import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

export default function ScreensSection() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cinemaId, setCinemaId] = useState("");
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/screens";

  // Fetch all screens
  const fetchScreens = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setScreens(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch screens");
    } finally {
      setLoading(false);
    }
  };

  // Add new screen
  const addScreen = async () => {
    if (!cinemaId || !name) return alert("Please fill all fields");
    try {
      const data = qs.stringify({ cinema_id: cinemaId, name });
      await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      resetForm();
      fetchScreens();
    } catch (err) {
      console.error(err);
      alert("Failed to add screen");
    }
  };

  // Update screen
  const updateScreen = async () => {
    if (!editId) return;
    try {
      const data = qs.stringify({ cinema_id: cinemaId, name });
      await axios.put(`${API_URL}/${editId}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      resetForm();
      fetchScreens();
    } catch (err) {
      console.error(err);
      alert("Failed to update screen");
    }
  };

  // Delete screen
  const deleteScreen = async (id) => {
    if (!window.confirm("Are you sure you want to delete this screen?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      fetchScreens();
    } catch (err) {
      console.error(err);
      alert("Failed to delete screen");
    }
  };

  const resetForm = () => {
    setCinemaId("");
    setName("");
    setEditId(null);
  };

  useEffect(() => {
    fetchScreens();
  }, []);

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Manage Screens</h3>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Cinema ID"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={cinemaId}
          onChange={(e) => setCinemaId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Screen Name"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {editId ? (
          <button
            onClick={updateScreen}
            className="px-4 py-2 bg-green-400 text-gray-900 rounded-md font-semibold"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addScreen}
            className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold"
          >
            + Add Screen
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-300">Loading screens...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="text-yellow-300 uppercase text-sm">
                {screens[0] &&
                  Object.keys(screens[0]).map((col) => (
                    <th key={col} className="p-3">{col}</th>
                  ))}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {screens.map((s) => (
                <tr key={s.screen_id} className="hover:bg-white/5">
                  {Object.values(s).map((val, i) => (
                    <td key={i} className="p-3">{val}</td>
                  ))}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(s.screen_id);
                        setCinemaId(s.cinema_id);
                        setName(s.name);
                      }}
                      className="px-3 py-1 bg-blue-400 text-gray-900 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteScreen(s.screen_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
