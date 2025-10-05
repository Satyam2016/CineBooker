import useAuthStore from "../../store/useAuthStore";

export default function ProfileCard({ bookings }) {
  const upcoming = bookings.filter((b) => b.status === "upcoming").length;
  const past = bookings.filter((b) => b.status === "past").length;
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20 mb-8">
      <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl bg-gradient-to-tr from-yellow-400 to-yellow-200 border-4 border-white/30">👤</div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-yellow-400">{user?.name || "Guest"}</h2>
        <p className="text-white/90">📧 {user?.email}</p>

        <p className="text-white/70">📅 Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
        <Stat value={bookings.length} label="Total" />
        <Stat value={upcoming} label="Upcoming" />
        <Stat value={past} label="Past" />
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-white/10 text-center p-4 rounded-lg">
      <div className="text-2xl font-bold text-yellow-400">{value}</div>
      <div className="text-white/70">{label}</div>
    </div>
  );
}
