import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";

export default function CinemasSection() {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/cinemas";

 
  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setCinemas(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch cinemas.");
    } finally {
      setLoading(false);
    }
  };

  
  const addCinema = async () => {
    if (!name || !location) return alert("Please fill all fields");

    try {
      const data = qs.stringify({ name, location });
      await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setName("");
      setLocation("");
      fetchCinemas();
    } catch (err) {
      console.error(err);
      alert("Failed to add cinema");
    }
  };


  const updateCinema = async () => {
    if (!editId) return;
    try {
      const data = qs.stringify({ name, location });
      await axios.put(`${API_URL}/${editId}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setEditId(null);
      setName("");
      setLocation("");
      fetchCinemas();
    } catch (err) {
      console.error(err);
      alert("Failed to update cinema");
    }
  };

 
  const deleteCinema = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cinema?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      fetchCinemas();
    } catch (err) {
      console.error(err);
      alert("Failed to delete cinema");
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Manage Cinemas</h3>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Cinema Name"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="bg-white/10 p-2 rounded-md border border-white/20 w-1/3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {editId ? (
          <button
            onClick={updateCinema}
            className="px-4 py-2 bg-green-400 text-gray-900 rounded-md font-semibold"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addCinema}
            className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold"
          >
            + Add Cinema
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-300">Loading cinemas...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="text-yellow-300 uppercase text-sm">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Screens</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cinemas.map((c) => (
                <tr key={c.cinema_id} className="hover:bg-white/5">
                  <td className="p-3">{c.cinema_id}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.location}</td>
                  <td className="p-3">{c.screens || '-'} </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(c.cinema_id);
                        setName(c.name);
                        setLocation(c.location);
                      }}
                      className="px-3 py-1 bg-blue-400 text-gray-900 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCinema(c.cinema_id)}
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
