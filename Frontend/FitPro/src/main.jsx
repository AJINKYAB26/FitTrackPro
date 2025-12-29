import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom/client"; 
import AuthProvider from "./components/context/AuthContext.jsx";
import  { FitnessProvider } from "./components/context/FitnessContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <FitnessProvider>
        <App />
        </FitnessProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
