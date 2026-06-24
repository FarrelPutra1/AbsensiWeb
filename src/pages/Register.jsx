import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/register`;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // PERBAIKAN: Mengubah properti JSON menjadi PascalCase agar sesuai dengan Model di backend .NET
        body: JSON.stringify({ 
          Username: username, 
          Password: password, 
          NamaLengkap: namaLengkap 
        })
      });

      if (response.ok) {
        setSuccess("Registrasi berhasil. Mengalihkan ke halaman login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Registrasi gagal, periksa kembali data Anda.");
      }
    } catch (err) {
      setError("Server tidak merespons. Periksa koneksi Anda.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "40px 32px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
          border: "1px solid #f1f5f9"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#4f46e5",
              borderRadius: "12px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            A
          </div>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
              letterSpacing: "-0.5px"
            }}
          >
            Pendaftaran Admin
          </h2>
          <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>
            Lengkapi form di bawah untuk membuat akun
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              borderLeft: "4px solid #ef4444",
              color: "#b91c1c",
              padding: "12px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "24px",
              fontWeight: "500"
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: "#f0fdf4",
              borderLeft: "4px solid #22c55e",
              color: "#166534",
              padding: "12px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "24px",
              fontWeight: "500"
            }}
          >
            {success}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#334155"
              }}
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
              placeholder="Masukkan nama lengkap"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                color: "#0f172a",
                backgroundColor: "#f8fafc",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4f46e5";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.backgroundColor = "#f8fafc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#334155"
              }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Buat username"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                color: "#0f172a",
                backgroundColor: "#f8fafc",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4f46e5";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.backgroundColor = "#f8fafc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#334155"
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                color: "#0f172a",
                backgroundColor: "#f8fafc",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4f46e5";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.backgroundColor = "#f8fafc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          >
            Daftar Sekarang
          </button>
        </form>

        <div
          style={{
            marginTop: "32px",
            textAlign: "center",
            fontSize: "14px",
            color: "#64748b"
          }}
        >
          Sudah memiliki akun?{" "}
          <Link
            to="/login"
            style={{
              color: "#4f46e5",
              fontWeight: "600",
              textDecoration: "none",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => (e.target.style.color = "#3730a3")}
            onMouseOut={(e) => (e.target.style.color = "#4f46e5")}
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
