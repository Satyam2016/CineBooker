import { useState } from "react";
import axios from "axios";

export default function CinemaModal({ onClose, onCinemaAdded }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!name.trim() || !location.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("location", location);

      await axios.post("http://localhost:5000/api/cinemas", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (onCinemaAdded) onCinemaAdded(); 
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to add cinema. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white/10 p-6 rounded-xl border border-white/20 w-96">
        <h3 className="text-xl font-semibold mb-4 text-yellow-300">
          Add New Cinema
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Cinema Name"
            className="w-full bg-white/5 p-2 rounded-md border border-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-white/5 p-2 rounded-md border border-white/20"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500/50 rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
