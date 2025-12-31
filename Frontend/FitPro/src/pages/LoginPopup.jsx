import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/context/AuthContext.jsx";
import { Button } from "../components/UI/button.jsx";
import { Mail, Lock, Eye, EyeOff, Dumbbell, X } from "lucide-react";
import api from "../lib/api.jsx";


export default function LoginPopup({ close }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await api.post(
      "/users/login",
      { email, password }
    );

    const { token, user } = res.data;

    // ✅ Store token + user
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    login(token);

    close();

    // ✅ Role-based redirect
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      
      {/* CLOSE */}
      <button
        onClick={close}
        className="absolute top-6 right-6 text-gray-400 hover:text-white"
      >
        <X />
      </button>

      {/* CARD */}
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-yellow-300/20 shadow-xl animate-fade-up">

        {/* GLOW */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-yellow-400/10 blur-3xl" />

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-300 text-black mb-4 shadow-lg">
            <Dumbbell className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-300 focus:outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-300 text-black hover:bg-yellow-400 font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
