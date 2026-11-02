
import "dotenv/config";
import express from "express";
import { prisma } from "./client.ts";

const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3010;

// GET semua anggota
app.get("/anggota", async (_req, res) => {
  try {
    const anggota = await prisma.anggota.findMany({
      include: { absensi: true },
    });

    res.status(200).json({
      success: true,
      message: "Data anggota berhasil diambil",
      data: anggota,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data anggota",
    });
  }
});

// GET detail anggota
app.get("/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({
        success: false,
        message: "ID anggota tidak valid",
      });
      return;
    }

    const anggota = await prisma.anggota.findUnique({
      where: { id },
      include: { absensi: true },
    });

    if (!anggota) {
      res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Detail anggota berhasil diambil",
      data: anggota,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail anggota",
    });
  }
});

// POST anggota
app.post("/anggota", async (req, res) => {
  try {
    const { nim, nama, prodi } = req.body;
    const details: string[] = [];

    if (typeof nim !== "string" || !nim.trim()) {
      details.push("NIM wajib diisi");
    }

    if (typeof nama !== "string" || !nama.trim()) {
      details.push("Nama wajib diisi");
    }

    if (typeof prodi !== "string" || !prodi.trim()) {
      details.push("Program studi wajib diisi");
    }

    if (details.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details,
      });
      return;
    }

    const anggota = await prisma.anggota.create({
      data: {
        nim: nim.trim(),
        nama: nama.trim(),
        prodi: prodi.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data: anggota,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(400).json({
        success: false,
        message: "NIM sudah terdaftar",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan anggota",
    });
  }
});

// PATCH anggota
app.patch("/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({
        success: false,
        message: "ID anggota tidak valid",
      });
      return;
    }

    const { nim, nama, prodi } = req.body;
    const data: { nim?: string; nama?: string; prodi?: string } = {};
    const details: string[] = [];

    for (const [key, value] of Object.entries({ nim, nama, prodi })) {
      if (value === undefined) continue;

      if (typeof value !== "string" || !value.trim()) {
        details.push(`${key} harus berupa teks dan tidak boleh kosong`);
      } else {
        data[key as keyof typeof data] = value.trim();
      }
    }

    if (details.length || Object.keys(data).length === 0) {
      res.status(400).json({
        success: false,
        message: details.length
          ? "Validasi gagal"
          : "Tidak ada data untuk diubah",
        details,
      });
      return;
    }

    const anggota = await prisma.anggota.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Anggota berhasil diperbarui",
      data: anggota,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
      return;
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(400).json({
        success: false,
        message: "NIM sudah digunakan anggota lain",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui anggota",
    });
  }
});

// DELETE anggota
app.delete("/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({
        success: false,
        message: "ID anggota tidak valid",
      });
      return;
    }

    await prisma.anggota.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Gagal menghapus anggota",
    });
  }
});

// GET semua absensi
app.get("/absensi", async (_req, res) => {
  try {
    const absensi = await prisma.absensi.findMany({
      include: { anggota: true },
      orderBy: { tanggal: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Data absensi berhasil diambil",
      data: absensi,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data absensi",
    });
  }
});

// GET detail absensi
app.get("/absensi/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({
        success: false,
        message: "ID absensi tidak valid",
      });
      return;
    }

    const absensi = await prisma.absensi.findUnique({
      where: { id },
      include: { anggota: true },
    });

    if (!absensi) {
      res.status(404).json({
        success: false,
        message: "Data absensi tidak ditemukan",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Detail absensi berhasil diambil",
      data: absensi,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail absensi",
    });
  }
});

// POST absensi
app.post("/absensi", async (req, res) => {
  try {
    const { anggotaId, tanggal, waktuMasuk, status, keterangan } = req.body;
    const details: string[] = [];

    if (!Number.isInteger(anggotaId) || anggotaId < 1) {
      details.push("anggotaId harus berupa ID anggota yang valid");
    }

    if (
      typeof tanggal !== "string" ||
      !tanggal.trim() ||
      Number.isNaN(Date.parse(tanggal))
    ) {
      details.push("Tanggal wajib diisi dengan format tanggal yang valid");
    }

    if (
      waktuMasuk !== undefined &&
      waktuMasuk !== null &&
      typeof waktuMasuk !== "string"
    ) {
      details.push("Waktu masuk harus berupa teks");
    }

    if (
      typeof status !== "string" ||
      !["Hadir", "Izin", "Sakit", "Alpa"].includes(status)
    ) {
      details.push("Status harus Hadir, Izin, Sakit, atau Alpa");
    }

    if (
      keterangan !== undefined &&
      keterangan !== null &&
      typeof keterangan !== "string"
    ) {
      details.push("Keterangan harus berupa teks");
    }

    if (details.length) {
      res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details,
      });
      return;
    }

    const absensi = await prisma.absensi.create({
      data: {
        anggotaId,
        tanggal: new Date(tanggal),
        waktuMasuk: waktuMasuk ?? null,
        status,
        keterangan: keterangan ?? null,
      },
      include: { anggota: true },
    });

    res.status(201).json({
      success: true,
      message: "Absensi berhasil ditambahkan",
      data: absensi,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2003"
    ) {
      res.status(400).json({
        success: false,
        message: "Anggota dengan ID tersebut tidak ditemukan",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan absensi",
    });
  }
});

// PATCH absensi
app.patch("/absensi/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({
        success: false,
        message: "ID absensi tidak valid",
      });
      return;
    }

    const { anggotaId, tanggal, waktuMasuk, status, keterangan } = req.body;
    const data: {
      anggotaId?: number;
      tanggal?: Date;
      waktuMasuk?: string | null;
      status?: string;
      keterangan?: string | null;
    } = {};
    const details: string[] = [];

    if (anggotaId !== undefined) {
      if (!Number.isInteger(anggotaId) || anggotaId < 1) {
        details.push("anggotaId tidak valid");
      } else {
        data.anggotaId = anggotaId;
      }
    }

    if (tanggal !== undefined) {
      if (
        typeof tanggal !== "string" ||
        !tanggal.trim() ||
        Number.isNaN(Date.parse(tanggal))
      ) {
        details.push("Tanggal tidak valid");
      } else {
        data.tanggal = new Date(tanggal);
      }
    }

    if (waktuMasuk !== undefined) {
      if (waktuMasuk !== null && typeof waktuMasuk !== "string") {
        details.push("Waktu masuk harus berupa teks");
      } else {
        data.waktuMasuk = waktuMasuk;
      }
    }

    if (status !== undefined) {
      if (
        typeof status !== "string" ||
        !["Hadir", "Izin", "Sakit", "Alpa"].includes(status)
      ) {
        details.push("Status harus Hadir, Izin, Sakit, atau Alpa");
      } else {
        data.status = status;
      }
    }

    if (keterangan !== undefined) {
      if (keterangan !== null && typeof keterangan !== "string") {
        details.push("Keterangan harus berupa teks");
      } else {
        data.keterangan = keterangan;
      }
    }

    if (details.length || Object.keys(data).length === 0) {
      res.status(400).json({
        success: false,
        message: details.length
          ? "Validasi gagal"
          : "Tidak ada data untuk diubah",
        details,
      });
      return;
    }

    const absensi = await prisma.absensi.update({
      where: { id },
      data,
      include: { anggota: true },
    });

    res.status(200).json({
      success: true,
      message: "Absensi berhasil diperbarui",
      data: absensi,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error.code === "P2025" || error.code === "P2003")
    ) {
      res.status(404).json({
        success: false,
        message: "Absensi atau anggota tidak ditemukan",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui absensi",
    });
  }
});

// DELETE absensi
app.delete("/absensi/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({
        success: false,
        message: "ID absensi tidak valid",
      });
      return;
    }

    await prisma.absensi.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      res.status(404).json({
        success: false,
        message: "Data absensi tidak ditemukan",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Gagal menghapus absensi",
    });
  }
});

app.listen(port, () => {
  console.log(`API Absensi berjalan di http://localhost:${port}`);
});
