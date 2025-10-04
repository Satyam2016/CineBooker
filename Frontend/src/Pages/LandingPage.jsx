import useAuthStore from "../store/useAuthStore";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

export default function LandingPage() {
  const { setLoginOpen, setSignupOpen } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 text-white">
     
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
          🎬 CineBooker
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setLoginOpen(true)}
            className="px-5 py-2 border-2 border-white rounded-full hover:bg-white hover:text-indigo-500 transition"
          >
            Login
          </button>
          <button
            onClick={() => setSignupOpen(true)}
            className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900 hover:shadow-xl transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

   
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 gap-8">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Experience Cinema Like Never Before
          </h1>
          <p className="text-lg mb-6 opacity-90">
            Book your favorite movies instantly. Choose your seats, select your shows, and enjoy seamless booking.
          </p>
          <button
            onClick={() => setSignupOpen(true)}
            className="px-6 py-3 text-lg rounded-full font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900 hover:shadow-xl transition"
          >
            Get Started Now
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 hover:-translate-y-2 hover:rotate-y-6 transition cursor-pointer">
            <h3 className="text-yellow-400 font-bold mb-2">🎭 Premium Halls</h3>
            <p className="text-sm opacity-80">Luxury seating with state-of-the-art sound</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 hover:-translate-y-2 hover:rotate-y-6 transition cursor-pointer">
            <h3 className="text-yellow-400 font-bold mb-2">🎫 Easy Booking</h3>
            <p className="text-sm opacity-80">Book tickets in just a few clicks</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 hover:-translate-y-2 hover:rotate-y-6 transition cursor-pointer">
            <h3 className="text-yellow-400 font-bold mb-2">💺 Best Seats</h3>
            <p className="text-sm opacity-80">Real-time seat selection and availability</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 hover:-translate-y-2 hover:rotate-y-6 transition cursor-pointer">
            <h3 className="text-yellow-400 font-bold mb-2">⭐ Top Movies</h3>
            <p className="text-sm opacity-80">Latest blockbusters and premieres</p>
          </div>
        </div>
      </div>

      <Login />
      <Signup />
    </div>
  );
}
