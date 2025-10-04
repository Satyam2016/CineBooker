import React from "react";

export default function ScreensSection({ screens, onAdd }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Manage Screens</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-md bg-yellow-300 text-gray-800 font-semibold"
        >
          + Add Screen
        </button>
      </div>
      <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="text-yellow-300 uppercase text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Cinema</th>
              <th className="p-3">Name</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {screens.map((s) => (
              <tr key={s.id} className="hover:bg-white/5">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.cinemaName}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.seats}</td>
                <td className="p-3">{s.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
