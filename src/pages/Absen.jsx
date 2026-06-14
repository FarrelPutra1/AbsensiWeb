import { useEffect, useState } from "react";

export default function Absen() {
  const [attendances, setAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
  const [jamMasuk, setJamMasuk] = useState(null);
  const [jamPulang, setJamPulang] = useState(null);
  const [editId, setEditId] = useState(null);

  const API_ATTENDANCE = `${import.meta.env.VITE_API_URL}/api/attendance`;
  const API_STUDENTS = `${import.meta.env.VITE_API_URL}/api/students`;
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  };

  const fetchAttendances = () => {
    fetch(API_ATTENDANCE, { headers: getAuthHeaders() })
      .then((res) => (res.status === 401 ? null : res.json()))
      .then((data) => {
        if (data) setAttendances(data);
      })
      .catch((err) => console.error("Gagal mengambil data:", err));
  };

  const fetchStudents = () => {
    fetch(API_STUDENTS)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Gagal mengambil data siswa:", err));
  };

  useEffect(() => {
    fetchAttendances();
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) return alert("Silakan pilih siswa terlebih dahulu!");

    const isEditing = editId !== null;
    const payload = {
      studentId: parseInt(studentId),
      status: status,
      tanggal: new Date(tanggal).toISOString(),
      jamMasuk: jamMasuk,
      jamPulang: jamPulang,
    };

    if (isEditing) {
      payload.id = editId;
      if (status === "Pulang" && !jamPulang) {
        payload.jamPulang = new Date().toISOString();
      }
    }

    const url = isEditing ? `${API_ATTENDANCE}/${editId}` : API_ATTENDANCE;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(isEditing ? "Data absensi berhasil diperbarui." : "Data absensi berhasil dicatat.");
        handleCancelEdit();
        fetchAttendances();
      } else {
        alert("Gagal menyimpan data.");
      }
    } catch (err) {
      alert("Tidak dapat terhubung ke server backend.");
    }
  };

  const handleEditTrigger = (att) => {
    setEditId(att.id);
    setStudentId(att.studentId || (att.student ? att.student.id : ""));
    setStatus(att.status);
    setJamMasuk(att.jamMasuk);
    setJamPulang(att.jamPulang);
    if (att.tanggal) setTanggal(att.tanggal.split("T")[0]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(`${API_ATTENDANCE}/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
        if (response.ok) {
          fetchAttendances();
          alert("Data berhasil dihapus.");
        }
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setStudentId("");
    setStatus("Hadir");
    setTanggal(new Date().toISOString().split("T")[0]);
    setJamMasuk(null);
    setJamPulang(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    color: "#0f172a",
    backgroundColor: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ margin: "0 0 8px 0", color: "#0f172a", fontSize: "28px", fontWeight: "700" }}>Data Absensi</h2>
          <p style={{ margin: "0", color: "#64748b", fontSize: "15px" }}>Kelola dan pantau catatan kehadiran siswa.</p>
        </div>

        {/* Form Card */}
        <div style={{ backgroundColor: "#ffffff", padding: "24px 32px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", marginBottom: "32px" }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "16px", fontWeight: "600" }}>
            {editId ? "Edit Catatan Absensi" : "Input Absensi Baru"}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "20px", alignItems: "flex-end", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Siswa</label>
              <select style={inputStyle} value={studentId} onChange={(e) => setStudentId(e.target.value)} required disabled={editId !== null}>
                <option value="">Pilih Siswa</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.nama} ({s.nomorInduk})</option>)}
              </select>
            </div>
            
            <div style={{ flex: "0 0 150px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Status</label>
              <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Alfa">Alfa</option>
                <option value="Pulang">Pulang</option>
              </select>
            </div>

            <div style={{ flex: "0 0 180px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Tanggal</label>
              <input type="date" style={inputStyle} value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" style={{ padding: "10px 20px", backgroundColor: editId ? "#059669" : "#4f46e5", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                {editId ? "Simpan Perubahan" : "Simpan Data"}
              </button>
              {editId && (
                <button type="button" onClick={handleCancelEdit} style={{ padding: "10px 20px", backgroundColor: "#ffffff", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Card */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  {["ID", "Nama Siswa", "Tanggal", "Jam Masuk", "Jam Pulang", "Status", "Tindakan"].map((h) => (
                    <th key={h} style={{ padding: "16px 24px", color: "#475569", fontSize: "12px", textTransform: "uppercase", textAlign: h === "Tindakan" ? "center" : "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendances.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "#64748b" }}>#{a.id}</td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500" }}>{a.student?.nama || "-"}</td>
                    <td style={{ padding: "16px 24px", fontSize: "14px" }}>{a.tanggal ? new Date(a.tanggal).toLocaleDateString("id-ID") : "-"}</td>
                    <td style={{ padding: "16px 24px", fontSize: "14px" }}>{a.jamMasuk ? new Date(a.jamMasuk).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "-"}</td>
                    <td style={{ padding: "16px 24px", fontSize: "14px" }}>{a.jamPulang ? new Date(a.jamPulang).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "-"}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", backgroundColor: "#f1f5f9", color: "#475569" }}>{a.status}</span>
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      <button onClick={() => handleEditTrigger(a)} style={{ marginRight: "8px", padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#fef3c7", color: "#d97706", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(a.id)} style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#fee2e2", color: "#ef4444", cursor: "pointer" }}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}