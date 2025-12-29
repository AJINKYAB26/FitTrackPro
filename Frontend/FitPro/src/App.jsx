import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../src/pages/HomePage.jsx";
// import Dashboard from "./pages/Dashboard";
import LoginPopup from "./pages/LoginPopup.jsx";
import { useState, useEffect } from "react";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

// ✅ ADMIN IMPORTS
import AdminRoute from "./utils/AdminRoute.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import Categories from "./Admin/pages/Categories";
import ExerciseTypes from "./Admin/pages/ExerciseTypes.jsx";
import AdminExercises from "./Admin/pages/Exercises.jsx";
import AdminUsers from "./Admin/AdminUsers.jsx"; // ✅ NEW
import Diet from "./pages/Diet.jsx"
import CalculatorPage from "./pages/CalculatorPage.jsx";


export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        setShowLogin(true);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowLogin(false);
    }
  }, [location.pathname]);
  return (
    <>
      {showLogin && <LoginPopup close={() => setShowLogin(false)} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <Exercises />
            </ProtectedRoute>
          }
        />
         <Route
          path="/diet"
          element={
            <ProtectedRoute>
              <Diet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <CalculatorPage />
            </ProtectedRoute>
          }
        />
        {/* 🔐 ADMIN PROTECTED */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          ></Route>
          <Route path="categories" element={<Categories />} />
          <Route path="exercise-types" element={<ExerciseTypes />} />
          <Route path="exercises" element={<AdminExercises />} />
          <Route path="users" element={<AdminUsers />} />


        </Route>
      </Routes>
    </>
  );
}

