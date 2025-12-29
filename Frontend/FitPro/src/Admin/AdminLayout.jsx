import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Dumbbell, LayoutGrid, ListChecks, LogOut } from "lucide-react";
import { Activity } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";


export default function AdminLayout() {
   const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // ✅ from AuthContext
    navigate("/", { replace: true });
  };

    return (
        <div className="min-h-screen flex bg-black text-white">

            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-yellow-300/20 p-6">
                <div className="flex items-center gap-2 mb-10">
                    <Dumbbell className="text-yellow-300" />
                    <span className="text-xl font-bold">Admin Panel</span>
                </div>

                <nav className="space-y-3">
                    <NavLink
                        to="/admin/categories"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg transition ${isActive
                                ? "bg-yellow-300/20 text-yellow-300"
                                : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <LayoutGrid size={18} />
                        Categories
                    </NavLink>
                    <NavLink
                        to="/admin/exercise-types"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg ${isActive
                                ? "bg-yellow-300/20 text-yellow-300"
                                : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <Activity size={18} />
                        Exercise Types
                    </NavLink>
                    {/* Exercises */}
                    <NavLink
                        to="/admin/exercises"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg transition ${isActive
                                ? "bg-yellow-300/20 text-yellow-300"
                                : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <ListChecks size={18} />
                        Exercises
                    </NavLink>

                    <NavLink
                        to="/admin/Users"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg transition ${isActive
                                ? "bg-yellow-300/20 text-yellow-300"
                                : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <ListChecks size={18} />
                        User
                    </NavLink>
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 mt-6 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}
