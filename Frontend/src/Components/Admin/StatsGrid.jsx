import React from "react";

export default function StatsGrid({ cinemas, screens, movies, bookings }) {
  const totalBookingsToday = (bookings[1] || []).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Stat icon="🏢" label="Total Cinemas" value={cinemas.length} />
      <Stat icon="📺" label="Total Screens" value={screens.length} />
      <Stat icon="🎬" label="Active Movies" value={movies.length} />
      <Stat icon="🎫" label="Bookings Today" value={totalBookingsToday} />
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="p-4 rounded-xl bg-white/10 border border-white/20">
      <div className="text-3xl">{icon}</div>
      <div className="text-3xl font-bold text-yellow-300">{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
}
