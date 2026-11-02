
import express from "express";

const app = express();

app.use(express.json());

// Data anggota sementara
const anggota = [
  {
    id: 1,
    nama: "Marsya Nurdrianti",
    divisi: "Humas",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Della Kartika",
    divisi: "Acara",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Faatin",
    divisi: "Humas",
    status: "Tidak Aktif",
  },
];

// Data absensi sementara
const absensi = [
  {
    id: 1,
    anggotaId: 1,
    tanggal: "2026-10-06",
    status: "Hadir",
  },
  {
    id: 2,
    anggotaId: 2,
    tanggal: "2026-10-06",
    status: "Izin",
  },
];

// =========================
// GET SEMUA ANGGOTA + FILTER
// =========================
app.get("/anggota", (req, res) => {
  const { divisi, status } = req.query;

  let data = [...anggota];

  if (divisi) {
    data = data.filter(
      (item) =>
        item.divisi.toLowerCase() === divisi.toLowerCase()
    );
  }

  if (status) {
    data = data.filter(
      (item) =>
        item.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    message: "Data anggota berhasil diambil",
    data,
  });
});

// =========================
// GET DETAIL ANGGOTA
// =========================
app.get("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "ID anggota harus berupa angka positif",
    });
  }

  const data = anggota.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  res.status(200).json({
    success: true,
    message: "Detail anggota berhasil diambil",
    data,
  });
});

// =========================
// POST ANGGOTA
// =========================
app.post("/anggota", (req, res) => {
  const { nama, divisi, status } = req.body;
  const errors = [];

  if (typeof nama !== "string" || nama.trim() === "") {
    errors.push("Nama wajib diisi dengan teks");
  }

  if (typeof divisi !== "string" || divisi.trim() === "") {
    errors.push("Divisi wajib diisi dengan teks");
  }

  if (
    typeof status !== "string" ||
    !["Aktif", "Tidak Aktif"].includes(status.trim())
  ) {
    errors.push("Status harus Aktif atau Tidak Aktif");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Data anggota tidak valid",
      details: errors,
    });
  }

  const newAnggota = {
    id: anggota.length
      ? Math.max(...anggota.map((item) => item.id)) + 1
      : 1,
    nama: nama.trim(),
    divisi: divisi.trim(),
    status: status.trim(),
  };

  anggota.push(newAnggota);

  res.status(201).json({
    success: true,
    message: "Anggota berhasil ditambahkan",
    data: newAnggota,
  });
});

// =========================
// PUT ANGGOTA
// =========================
app.put("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = anggota.find((item) => item.id === id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "ID anggota tidak valid",
    });
  }

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  const { nama, divisi, status } = req.body;

  if (
    typeof nama !== "string" ||
    nama.trim() === "" ||
    typeof divisi !== "string" ||
    divisi.trim() === "" ||
    typeof status !== "string" ||
    !["Aktif", "Tidak Aktif"].includes(status.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Nama, divisi, dan status wajib valid",
    });
  }

  data.nama = nama.trim();
  data.divisi = divisi.trim();
  data.status = status.trim();

  res.status(200).json({
    success: true,
    message: "Data anggota berhasil diperbarui",
    data,
  });
});

// =========================
// PATCH ANGGOTA
// =========================
app.patch("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = anggota.find((item) => item.id === id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "ID anggota tidak valid",
    });
  }

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  const { nama, divisi, status } = req.body;
  const fields = { nama, divisi, status };

  if (Object.values(fields).every((value) => value === undefined)) {
    return res.status(400).json({
      success: false,
      message: "Minimal satu data harus diubah",
    });
  }

  if (
    nama !== undefined &&
    (typeof nama !== "string" || nama.trim() === "")
  ) {
    return res.status(400).json({
      success: false,
      message: "Nama harus berupa teks dan tidak boleh kosong",
    });
  }

  if (
    divisi !== undefined &&
    (typeof divisi !== "string" || divisi.trim() === "")
  ) {
    return res.status(400).json({
      success: false,
      message: "Divisi harus berupa teks dan tidak boleh kosong",
    });
  }

  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !["Aktif", "Tidak Aktif"].includes(status.trim()))
  ) {
    return res.status(400).json({
      success: false,
      message: "Status harus Aktif atau Tidak Aktif",
    });
  }

  if (nama !== undefined) data.nama = nama.trim();
  if (divisi !== undefined) data.divisi = divisi.trim();
  if (status !== undefined) data.status = status.trim();

  res.status(200).json({
    success: true,
    message: "Data anggota berhasil diperbarui sebagian",
    data,
  });
});

// =========================
// DELETE ANGGOTA
// =========================
app.delete("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "ID anggota tidak valid",
    });
  }

  const index = anggota.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  anggota.splice(index, 1);

  // Status 204 tidak mengirim response body
  res.status(204).send();
});

// =========================
// GET SEMUA ABSENSI + FILTER
// =========================
app.get("/absensi", (req, res) => {
  const { tanggal, status } = req.query;

  let data = [...absensi];

  if (tanggal) {
    data = data.filter((item) => item.tanggal === tanggal);
  }

  if (status) {
    data = data.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    message: "Data absensi berhasil diambil",
    data,
  });
});

// =========================
// GET DETAIL ABSENSI
// =========================
app.get("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "ID absensi harus berupa angka positif",
    });
  }

  const data = absensi.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  res.status(200).json({
    success: true,
    message: "Detail absensi berhasil diambil",
    data,
  });
});

// =========================
// POST ABSENSI
// =========================
app.post("/absensi", (req, res) => {
  const { anggotaId, tanggal, status } = req.body;
  const daftarStatus = ["Hadir", "Izin", "Sakit", "Alpa"];

  if (
    !Number.isInteger(anggotaId) ||
    anggotaId < 1 ||
    typeof tanggal !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(tanggal) ||
    typeof status !== "string" ||
    !daftarStatus.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "anggotaId harus angka positif, tanggal berformat YYYY-MM-DD, dan status harus Hadir, Izin, Sakit, atau Alpa",
    });
  }

  const anggotaData = anggota.find(
    (item) => item.id === anggotaId
  );

  if (!anggotaData) {
    return res.status(404).json({
      success: false,
      message: "Anggota yang akan diabsen tidak ditemukan",
    });
  }

  const newAbsensi = {
    id: absensi.length
      ? Math.max(...absensi.map((item) => item.id)) + 1
      : 1,
    anggotaId,
    tanggal,
    status,
  };

  absensi.push(newAbsensi);

  res.status(201).json({
    success: true,
    message: "Data absensi berhasil ditambahkan",
    data: newAbsensi,
  });
});

// =========================
// PENANGANAN JSON TIDAK VALID
// =========================
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Format JSON tidak valid",
    });
  }

  next(err);
});

// =========================
// ROUTE TIDAK DITEMUKAN
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

export default app;
