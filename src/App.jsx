import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Siswa from "./pages/Siswa";
import Absen from "./pages/Absen";
import Login from "./pages/Login";
import Register from "./pages/Register";

function MainLayout() {
  const { isAuthenticated, namaAdmin, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div>
      <nav style={{ padding: "15px 30px", backgroundColor: "#1d1d1d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "25px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}> Data Siswa</Link>
          <Link to="/absen" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}> Absensi (JWT)</Link>
        </div>
        <div style={{ color: "white", display: "flex", alignItems: "center", gap: "15px" }}>
          <span>Halo, <strong>{namaAdmin}</strong>! </span>
          <button onClick={logout} style={{ padding: "6px 12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Logout</button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Siswa />} />
        <Route path="/absen" element={<Absen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}