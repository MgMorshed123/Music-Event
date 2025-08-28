import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAppContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate(res.data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleSignup = async (e) => {
    navigate("/register");
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
        role: "user",
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-16">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login / Signup
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
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-neon-blue/80 flex-1"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-neon-pink text-white px-6 py-3 rounded-full hover:bg-neon-pink/80 flex-1"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
