import { useEffect, useState } from "react";

export default function Siswa() {
  const [students, setStudents] = useState([]);
  const [nama, setNama] = useState("");
  const [nomorInduk, setNomorInduk] = useState("");
  const [editId, setEditId] = useState(null);

  // --- PERUBAHAN DI SINI ---
  // Jika di Vercel ada VITE_API_URL, pakai itu. Jika tidak ada (di laptop), otomatis pakai localhost.
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5062";
  const API_URL = `${BASE_URL}/api/students`;
  // -------------------------

  const fetchStudents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Gagal ambil data siswa:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditing = editId !== null;
    const payload = isEditing
      ? { id: editId, nama, nomorInduk }
      : { nama, nomorInduk };

    const url = isEditing ? `${API_URL}/${editId}` : API_URL;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setNama("");
        setNomorInduk("");
        setEditId(null);
        fetchStudents();
        alert(isEditing ? "Data siswa berhasil diperbarui." : "Siswa baru berhasil ditambahkan.");
      } else {
        alert("Gagal menyimpan data. Periksa kembali inputan Anda.");
      }
    } catch (err) {
      alert("Tidak dapat terhubung ke server backend.");
    }
  };

  const handleEditTrigger = (siswa) => {
    setEditId(siswa.id);
    setNama(siswa.nama);
    setNomorInduk(siswa.nomorInduk);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchStudents();
          alert("Data siswa berhasil dihapus.");
        } else {
          alert("Gagal menghapus data siswa.");
        }
      } catch (err) {
        alert("Tidak dapat terhubung ke server backend.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNama("");
    setNomorInduk("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              margin: "0 0 8px 0",
              color: "#0f172a",
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
            }}
          >
            Data Induk Siswa
          </h2>
          <p style={{ margin: "0", color: "#64748b", fontSize: "15px" }}>
            Kelola seluruh data induk siswa yang terintegrasi dengan database.
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "24px 32px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",
            border: "1px solid #e2e8f0",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: "#1e293b",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {editId ? "Edit Data Siswa" : "Tambah Siswa Baru"}
          </h3>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 250px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
                Nama Lengkap Siswa
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                placeholder="Masukkan nama siswa"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  color: "#0f172a",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4f46e5";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
                NISN (Nomor Induk)
              </label>
              <input
                type="text"
                value={nomorInduk}
                onChange={(e) => setNomorInduk(e.target.value)}
                required
                placeholder="Contoh: 0041234567"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  color: "#0f172a",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4f46e5";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: editId ? "#059669" : "#4f46e5",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = editId ? "#047857" : "#4338ca")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = editId ? "#059669" : "#4f46e5")
                }
              >
                {editId ? "Simpan Perubahan" : "Tambah Data"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ffffff",
                    color: "#475569",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f1f5f9";
                    e.target.style.color = "#0f172a";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.color = "#475569";
                  }}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "16px 24px", color: "#475569", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", width: "10%" }}>
                    ID
                  </th>
                  <th style={{ padding: "16px 24px", color: "#475569", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Nama Siswa
                  </th>
                  <th style={{ padding: "16px 24px", color: "#475569", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", width: "25%" }}>
                    NISN
                  </th>
                  <th style={{ padding: "16px 24px", color: "#475569", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", width: "20%", textAlign: "center" }}>
                    Tindakan
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "32px",
                        color: "#64748b",
                        fontSize: "14px",
                      }}
                    >
                      Tidak ada data siswa atau server tidak terhubung.
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr
                      key={s.id}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "16px 24px", color: "#64748b", fontSize: "14px" }}>
                        #{s.id}
                      </td>
                      <td style={{ padding: "16px 24px", color: "#0f172a", fontSize: "14px", fontWeight: "500" }}>
                        {s.nama}
                      </td>
                      <td style={{ padding: "16px 24px", color: "#475569", fontSize: "14px" }}>
                        {s.nomorInduk}
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "center" }}>
                        <button
                          onClick={() => handleEditTrigger(s)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#fef3c7",
                            color: "#d97706",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "13px",
                            marginRight: "8px",
                            transition: "background-color 0.2s",
                          }}
                          onMouseOver={(e) => (e.target.style.backgroundColor = "#fde68a")}
                          onMouseOut={(e) => (e.target.style.backgroundColor = "#fef3c7")}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#fee2e2",
                            color: "#ef4444",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "13px",
                            transition: "background-color 0.2s",
                          }}
                          onMouseOver={(e) => (e.target.style.backgroundColor = "#fecaca")}
                          onMouseOut={(e) => (e.target.style.backgroundColor = "#fee2e2")}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}