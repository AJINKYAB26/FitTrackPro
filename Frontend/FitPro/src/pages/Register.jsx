import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/UI/button";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Dumbbell,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://fittrackpro.onrender.com/api/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-300/20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300/10 blur-3xl rounded-full" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-yellow-300/20 rounded-3xl p-8 shadow-xl animate-fade-up">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-300 text-black mb-4 shadow-lg">
            <Dumbbell className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">
            Start your fitness journey today
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-300 outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-300 outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-300 outline-none"
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-300 outline-none"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-300 text-black hover:bg-yellow-400 font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-yellow-300 hover:underline font-semibold"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
