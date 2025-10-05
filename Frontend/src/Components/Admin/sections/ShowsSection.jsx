import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import SeatGrid from "../SeatGrid";

export default function ShowsSection() {
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState({});
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [movieId, setMovieId] = useState("");
  const [screenId, setScreenId] = useState("");
  const [showTime, setShowTime] = useState("");
  const [editId, setEditId] = useState(null);

  const SHOWS_API = "http://localhost:5000/api/shows";
  const BOOKINGS_API = "http://localhost:5000/api/bookings";

  
  const fetchShows = async () => {
    try {
      setLoading(true);
      const res = await axios.get(SHOWS_API, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setShows(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch shows");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(BOOKINGS_API, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log("Grouped bookings:", res.data);
      const grouped = res.data.reduce((acc, b) => {
        if (!acc[b.show_id]) acc[b.show_id] = [];
        acc[b.show_id].push(b);
        return acc;
      }, {});
      setBookings(grouped);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchShows();
    fetchBookings();
  }, []);

  const resetForm = () => {
    setMovieId("");
    setScreenId("");
    setShowTime("");
    setEditId(null);
  };

  const addShow = async () => {
    if (!movieId || !screenId || !showTime) return alert("Fill all fields");
    try {
      const data = qs.stringify({ movie_id: movieId, screen_id: screenId, show_time: showTime });
      await axios.post(SHOWS_API, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      resetForm();
      fetchShows();
    } catch (err) {
      console.error(err);
      alert("Failed to add show");
    }
  };

  const updateShow = async () => {
    if (!editId) return;
    try {
      const data = qs.stringify({ movie_id: movieId, screen_id: screenId, show_time: showTime });
      await axios.put(`${SHOWS_API}/${editId}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      resetForm();
      fetchShows();
    } catch (err) {
      console.error(err);
      alert("Failed to update show");
    }
  };

  const deleteShow = async (id) => {
    if (!window.confirm("Are you sure you want to delete this show?")) return;
    try {
      await axios.delete(`${SHOWS_API}/${id}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      fetchShows();
    } catch (err) {
      console.error(err);
      alert("Failed to delete show");
    }
  };

  const selectedBookings = bookings[selectedShowId] || [];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Manage Shows & Bookings</h3>

      {/* Show form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Movie ID"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Screen ID"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={screenId}
          onChange={(e) => setScreenId(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Show Time"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={showTime}
          onChange={(e) => setShowTime(e.target.value)}
        />
        {editId ? (
          <button
            onClick={updateShow}
            className="px-4 py-2 bg-green-400 text-gray-900 rounded-md font-semibold"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addShow}
            className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold"
          >
            + Add Show
          </button>
        )}
      </div>

      {/* Shows Table */}
      {loading ? (
        <p className="text-gray-300">Loading shows...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-yellow-300 uppercase text-sm">
                <th className="p-3">Show ID</th>
                <th className="p-3">Movie</th>
                <th className="p-3">Cinema</th>
                <th className="p-3">Screen</th>
                <th className="p-3">Time</th>
                <th className="p-3">Actions</th>
                <th className="p-3">View Bookings</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((s) => (
                <tr key={s.show_id} className="hover:bg-white/5">
                  <td className="p-3">{s.show_id}</td>
                  <td className="p-3">{s.movie_title}</td>
                  <td className="p-3">{s.cinema_name}</td>
                  <td className="p-3">{s.screen_name}</td>
                  <td className="p-3">{new Date(s.show_time).toLocaleString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(s.show_id);
                        setMovieId(s.movie_id);
                        setScreenId(s.screen_id);
                        setShowTime(s.show_time.slice(0, 16)); // datetime-local value
                      }}
                      className="px-3 py-1 bg-blue-400 text-gray-900 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteShow(s.show_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setSelectedShowId(selectedShowId === s.show_id ? null : s.show_id)
                      }
                      className="text-yellow-300 underline"
                    >
                      {selectedShowId === s.show_id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedShowId && (
        <div className="bg-white/10 p-6 rounded-xl border border-white/20">
          <h4 className="text-xl mb-4">
            🎫 Seat Booking for Show #{selectedShowId}
          </h4>
          <SeatGrid showId={selectedShowId} bookings={selectedBookings} />
        </div>
      )}
    </section>
  );
}
