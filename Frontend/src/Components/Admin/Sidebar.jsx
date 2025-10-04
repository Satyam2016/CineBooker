import React from "react";

export default function Sidebar({ activeSection, switchSection }) {
  const items = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "cinemas", icon: "🏢", label: "Cinemas" },
    { id: "screens", icon: "📺", label: "Screens" },
    { id: "movies", icon: "🎬", label: "Movies" },
    { id: "shows", icon: "🎫", label: "Shows & Bookings" },
  ];

  return (
    <aside className="w-72 bg-black/30 backdrop-blur-lg p-6 border-r border-white/10 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-yellow-300">🎬 CineBooker</h1>
      <nav className="space-y-2">
        {items.map(it => (
          <button
            key={it.id}
            onClick={() => switchSection(it.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-all ${
              activeSection === it.id ? "bg-yellow-200/20 border-l-4 border-yellow-300 text-yellow-300" : "hover:bg-white/5"
            }`}
          >
            <span className="text-lg">{it.icon}</span>
            <span className="font-medium">{it.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
