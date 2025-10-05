export default function Tabs({ currentTab, setCurrentTab }) {
  return (
    <div className="flex border-b border-white/30 mb-8">
      {["upcoming", "past"].map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          className={`px-6 py-3 font-semibold transition ${
            currentTab === tab
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white/70 hover:text-white"
          }`}
        >
          {tab === "upcoming" ? "🎬 Upcoming Bookings" : "📼 Past Bookings"}
        </button>
      ))}
    </div>
  );
}
