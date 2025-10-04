import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import qs from "qs";
import { useNavigate  } from "react-router-dom";

export default function Login() {
  const {
    loginOpen,
    setLoginOpen,
    setSignupOpen,
    loginType,
    setLoginType,
    login
  } = useAuthStore();
  const navigate = useNavigate(); 

  if (!loginOpen) return null;

 const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
   const formData = qs.stringify({ email, password });

    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { token } = response.data;
    localStorage.setItem("token", token);
    setLoginOpen(false);
    navigate("/customer");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed. Please try again.");
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => setLoginOpen(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Login</h2>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setLoginType("customer")}
            className={`flex-1 py-2 rounded-lg ${
              loginType === "customer"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setLoginType("admin")}
            className={`flex-1 py-2 rounded-lg ${
              loginType === "admin" ? "bg-indigo-500 text-white" : "bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button className="w-full py-2 bg-indigo-500 text-white rounded-lg">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <button
            className="text-indigo-500 underline"
            onClick={() => {
              setLoginOpen(false);
              setSignupOpen(true);
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
