import React from "react";

export default function Header({ activeSection }) {
  const titles = {
    overview: "Dashboard Overview",
    cinemas: "Manage Cinemas",
    screens: "Manage Screens",
    movies: "Manage Movies",
    shows: "Shows & Bookings",
  };
  return (
    <header className="flex items-center justify-between bg-white/10 backdrop-blur p-4 rounded-xl mb-6">
      <h2 className="text-2xl font-semibold">{titles[activeSection] || "Dashboard"}</h2>
      <div className="flex items-center gap-4">
        <div className="text-sm">Admin User</div>
        <button className="px-3 py-1 rounded-md bg-white/10 border border-white/20">Logout</button>
      </div>
    </header>
  );
}
