import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Dumbbell,
  Utensils,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-yellow-300 text-black"
        : "text-gray-300 hover:bg-zinc-800"
    }`;

  return (
    <aside className="w-64 bg-zinc-900 border-r border-yellow-300/20 p-4">
      <h1 className="text-2xl font-black text-yellow-300 mb-8">
        FitPro Admin
      </h1>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          <Layers size={20} />
          Categories
        </NavLink>

        <NavLink to="/admin/exercise-types" className={linkClass}>
          <Dumbbell size={20} />
          Exercise Types
        </NavLink>

        <NavLink to="/admin/exercises" className={linkClass}>
          <Utensils size={20} />
          Exercises
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Utensils size={20} />
          Users
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
