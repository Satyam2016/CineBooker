const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md">
      <div className="text-2xl font-bold text-yellow-400">🎬 CineBooker</div>
      <div className="text-white flex items-center gap-4">
        <span>Welcome, John Doe</span>
        <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black">Logout</button>
      </div>
    </nav>
  );
};
export default Navbar;
