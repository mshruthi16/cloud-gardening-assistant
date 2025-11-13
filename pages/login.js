import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔒 Simple mock authentication (replace with API later)
    if (userId.trim() === "user123" && password === "password") {
      localStorage.setItem("userId", userId);
      navigate("/tracker"); // Redirect after login
    } else {
      setError("Invalid credentials. Try 'user123' / 'password'.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen flex justify-center items-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Welcome Back 🌿
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Log in to access your garden dashboard
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your User ID"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Don’t have an account?{" "}
            <span className="text-green-700 font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
