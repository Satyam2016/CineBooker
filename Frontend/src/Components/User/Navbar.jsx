export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-md border-b border-white/20">
      <div className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">🎬 CineBooker</div>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-yellow-400">Browse Movies</a>
        <a href="#" className="text-yellow-400">My Bookings</a>
        <button className="border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition">Logout</button>
      </div>
    </nav>
  );
}
