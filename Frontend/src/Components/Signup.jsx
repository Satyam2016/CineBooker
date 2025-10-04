
import useAuthStore from "../store/useAuthStore";

export default function Signup() {
  const { signupOpen, setSignupOpen, setLoginOpen } = useAuthStore();

  if (!signupOpen) return null;

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    alert(`Signup successful! Welcome, ${name}`);
    setSignupOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => setSignupOpen(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button className="w-full py-2 bg-indigo-500 text-white rounded-lg">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            className="text-indigo-500 underline"
            onClick={() => {
              setSignupOpen(false);
              setLoginOpen(true);
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
