import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

export default function MoviesSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/movies";

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  // Format date for MySQL
  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  // Add movie
  const addMovie = async () => {
    if (!title) return alert("Title is required");

    try {
      const data = qs.stringify({
        title,
        description,
        duration_minutes: duration,
        release_date: formatDate(releaseDate),
        language,
        genre,
      });
      await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      resetForm();
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to add movie");
    }
  };

  // Update movie
  const updateMovie = async () => {
    if (!editId) return;

    try {
      const data = qs.stringify({
        title,
        description,
        duration_minutes: duration,
        release_date: formatDate(releaseDate),
        language,
        genre,
      });
      await axios.put(`${API_URL}/${editId}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      resetForm();
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to update movie");
    }
  };

  // Delete movie
  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    setReleaseDate("");
    setLanguage("");
    setGenre("");
    setEditId(null);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Manage Movies</h3>

      {/* Form */}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/6"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="date"
          placeholder="Release Date"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/5"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Language"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/6"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/6"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        {editId ? (
          <button
            onClick={updateMovie}
            className="px-4 py-2 bg-green-400 text-gray-900 rounded-md font-semibold"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addMovie}
            className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold"
          >
            + Add Movie
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-300">Loading movies...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="text-yellow-300 uppercase text-sm">
                {movies[0] &&
                  Object.keys(movies[0]).map((col) => (
                    <th key={col} className="p-3">{col}</th>
                  ))}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.movie_id} className="hover:bg-white/5">
                  {Object.entries(m).map(([key, val], i) => (
                    <td key={i} className="p-3">
                      {key === "release_date" && val
                        ? new Date(val).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : val}
                    </td>
                  ))}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(m.movie_id);
                        setTitle(m.title);
                        setDescription(m.description || "");
                        setDuration(m.duration_minutes || "");
                        setReleaseDate(m.release_date || "");
                        setLanguage(m.language || "");
                        setGenre(m.genre || "");
                      }}
                      className="px-3 py-1 bg-blue-400 text-gray-900 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMovie(m.movie_id)}
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
