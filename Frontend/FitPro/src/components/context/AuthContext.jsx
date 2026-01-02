  import { createContext, useState, useEffect } from "react";

  export const AuthContext = createContext();

  export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          _id: payload.id,
          name: payload.name,
          role: payload.role,
        });
        setToken(token);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    }, []);

    const login = (token) => {
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));

      setUser({
        _id: payload.id,
        name: payload.name,
        role: payload.role,
      });
      setToken(token);
    };

    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    };

    return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
