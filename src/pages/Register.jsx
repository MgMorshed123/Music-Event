import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAppContext } from "../App";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", { email, password, role });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate(res.data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(
        "Signup failed: " + (err.response?.data?.msg || "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-16">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 text-white p-3 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white p-3 rounded-md w-full"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-700 text-white p-3 rounded-md w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleSignup}
            className="bg-neon-pink text-white px-6 py-3 rounded-full hover:bg-neon-pink/80 w-full"
          >
            Sign Up
          </button>
          <p className="text-gray-400 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-neon-blue hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
