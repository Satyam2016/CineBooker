import React from "react";

export default function MoviesSection({ movies, onAdd }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Manage Movies</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-md bg-yellow-300 text-gray-800 font-semibold"
        >
          + Add Movie
        </button>
      </div>
      <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="text-yellow-300 uppercase text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id} className="hover:bg-white/5">
                <td className="p-3">{m.id}</td>
                <td className="p-3">{m.title}</td>
                <td className="p-3">{m.genre}</td>
                <td className="p-3">{m.duration}</td>
                <td className="p-3">{m.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
