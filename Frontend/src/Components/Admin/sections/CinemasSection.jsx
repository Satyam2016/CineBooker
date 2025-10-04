import React from "react";

export default function CinemasSection({ cinemas, onAdd }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Manage Cinemas</h3>
        <button onClick={onAdd} className="px-4 py-2 rounded-md bg-yellow-300 text-gray-800 font-semibold">+ Add Cinema</button>
      </div>
      <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="text-yellow-300 uppercase text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Screens</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.map(c => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="p-3">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.location}</td>
                <td className="p-3">{c.screens}</td>
                <td className="p-3">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
