import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [namaAdmin, setNamaAdmin] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nama = localStorage.getItem("nama");
    if (token) {
      setIsAuthenticated(true);
      setNamaAdmin(nama || "Admin");
    }
    setLoading(false);
  }, []);

  const login = (token, nama) => {
    localStorage.setItem("token", token);
    localStorage.setItem("nama", nama);
    setIsAuthenticated(true);
    setNamaAdmin(nama);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setNamaAdmin("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, namaAdmin, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}