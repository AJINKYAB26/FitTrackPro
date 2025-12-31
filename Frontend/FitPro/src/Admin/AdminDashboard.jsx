import { useEffect, useState } from "react";
import { Dumbbell, Layers, Users } from "lucide-react";
import axios from "axios";
import api from "../lib/api.jsx"

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { label: "Exercises", value: 0, icon: Dumbbell },
    { label: "Categories", value: 0, icon: Layers },
    { label: "Exercise Types", value: 0, icon: Dumbbell },
    { label: "Users", value: 0, icon: Users },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        // Config for user request with Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch all counts in parallel
        const [exRes, catRes, typeRes, userRes] = await Promise.all([
          api.get("/exercises"),
          api.get("/categories"),
          api.get("/exercise-types"),
          api.get("/users", config), // Auth required
        ]);

        setStats([
          { label: "Exercises", value: exRes.data.length, icon: Dumbbell },
          { label: "Categories", value: catRes.data.length, icon: Layers },
          { label: "Exercise Types", value: typeRes.data.length, icon: Dumbbell },
          { label: "Users", value: userRes.data.length, icon: Users },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-black text-yellow-300 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-6 rounded-xl border border-yellow-300/20 hover:shadow-yellow-300/30 transition"
          >
            <item.icon className="text-yellow-300 mb-3" size={32} />
            <h3 className="text-3xl font-bold">{item.value}</h3>
            <p className="text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
