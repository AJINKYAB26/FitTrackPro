import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../UI/button";

import {
  Dumbbell,
  LayoutDashboard,
  Target,
  Utensils,
  Calculator,
  LogOut,
  User,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/exercises", label: "Exercises", icon: Target },
    { to: "/diet", label: "Diet Plan", icon: Utensils },
    { to: "/calculator", label: "Calculator", icon: Calculator },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-yellow-300/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-yellow-300/20 flex items-center justify-center shadow-[0_0_12px_rgba(253,224,71,0.5)]">
                <Dumbbell className="w-5 h-5 text-yellow-300" />
              </div>
              <span className="font-black text-xl text-white">
                FitTrack<span className="text-yellow-300">Pro</span>
              </span>
            </NavLink>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-yellow-300/20 text-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.4)]"
                        : "text-gray-400 hover:text-white hover:bg-yellow-300/10"
                    }
                  `
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* USER + LOGOUT */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-yellow-300/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="text-sm font-semibold text-white">
                  {user?.name || "User"}
                </span>
              </div>

              <Button
                onClick={handleLogout}
                className="bg-yellow-300 text-black hover:bg-yellow-400 transition font-bold"
                size="sm"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-yellow-300/20">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs
                transition-all duration-300
                ${
                  isActive
                    ? "text-yellow-300"
                    : "text-gray-400 hover:text-white"
                }
              `
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
