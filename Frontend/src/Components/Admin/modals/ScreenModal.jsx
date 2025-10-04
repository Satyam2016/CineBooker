import React, { useState } from "react";

export default function ScreenModal({ onClose }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white/10 p-6 rounded-xl border border-white/20 w-96">
        <h3 className="text-xl font-semibold mb-4 text-yellow-300">
          Add New Screen
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Screen Name"
            className="w-full bg-white/5 p-2 rounded-md border border-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type (e.g. 3D, IMAX)"
            className="w-full bg-white/5 p-2 rounded-md border border-white/20"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500/50 rounded-md"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
