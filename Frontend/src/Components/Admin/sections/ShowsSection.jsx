import React, { useState } from "react";
import SeatGrid from "../SeatGrid";

export default function ShowsSection({ shows, bookings }) {
  const [selectedShowId, setSelectedShowId] = useState(null);

  const selectedBookings = bookings[selectedShowId] || [];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Shows & Bookings</h3>
      </div>

      <div className="overflow-x-auto bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-yellow-300 uppercase text-sm">
              <th className="p-3">Show ID</th>
              <th className="p-3">Movie</th>
              <th className="p-3">Cinema</th>
              <th className="p-3">Screen</th>
              <th className="p-3">Time</th>
              <th className="p-3">View Seats</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((s) => (
              <tr key={s.id} className="hover:bg-white/5">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.movie}</td>
                <td className="p-3">{s.cinema}</td>
                <td className="p-3">{s.screen}</td>
                <td className="p-3">{s.time}</td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      setSelectedShowId(selectedShowId === s.id ? null : s.id)
                    }
                    className="text-yellow-300 underline"
                  >
                    {selectedShowId === s.id ? "Hide" : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
