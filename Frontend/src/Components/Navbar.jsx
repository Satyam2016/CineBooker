import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout, setLoginOpen } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      localStorage.removeItem("token");
      setLoginOpen(true);
      navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md">
      <div className="text-2xl font-bold text-yellow-400">🎬 CineBooker</div>
      <div className="text-white flex items-center gap-4">
        <span >Welcome, {user?.name || "Guest"}</span>  
        <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black"
        onClick={() => navigate("/user")}
        >Profile</button>
        <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black"
       onClick={handleLogout}
        >Logout</button>
      </div>
    </nav>
  );
};
export default Navbar;
