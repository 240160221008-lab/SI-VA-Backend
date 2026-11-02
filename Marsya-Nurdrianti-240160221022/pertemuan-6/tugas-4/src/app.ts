
import express from "express";
import { prisma } from "./client.js";

const app = express();

app.use(express.json());

// GET semua anggota
app.get("/anggota", async (req, res) => {
  try {
    const data = await prisma.anggota.findMany({
      include: { absensi: true },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data anggota" });
  }
});

// GET anggota berdasarkan ID
app.get("/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.anggota.findUnique({
      where: { id },
      include: { absensi: true },
    });

    if (!data) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail anggota" });
  }
});

// POST anggota baru
app.post("/anggota", async (req, res) => {
  try {
    const { nama, divisi, status } = req.body;

    if (!nama || !divisi || !status) {
      return res.status(400).json({ message: "Semua data harus diisi" });
    }

    const data = await prisma.anggota.create({
      data: { nama, divisi, status },
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan anggota" });
  }
});

// PATCH anggota
app.patch("/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, divisi, status } = req.body;

    const data = await prisma.anggota.update({
      where: { id },
      data: { nama, divisi, status },
    });

    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Anggota tidak ditemukan" });
  }
});

// DELETE anggota
app.delete("/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.anggota.delete({ where: { id } });

    res.json({ message: "Anggota berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ message: "Anggota tidak ditemukan" });
  }
});


// GET semua data absensi
app.get("/absensi", async (req, res) => {
  try {
    const data = await prisma.absensi.findMany({
      include: { anggota: true },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data absensi" });
  }
});

// GET detail absensi berdasarkan ID
app.get("/absensi/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.absensi.findUnique({
      where: { id },
      include: { anggota: true },
    });

    if (!data) {
      return res.status(404).json({ message: "Absensi tidak ditemukan" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail absensi" });
  }
});

// POST menambahkan absensi
app.post("/absensi", async (req, res) => {
  try {
    const { anggotaId, tanggal, keterangan } = req.body;

    if (!anggotaId || !tanggal || !keterangan) {
      return res.status(400).json({ message: "Semua data harus diisi" });
    }

    const data = await prisma.absensi.create({
      data: {
        anggotaId: Number(anggotaId),
        tanggal,
        keterangan,
      },
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan absensi" });
  }
});

// PATCH mengubah absensi
app.patch("/absensi/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { anggotaId, tanggal, keterangan } = req.body;

    const data = await prisma.absensi.update({
      where: { id },
      data: {
        anggotaId,
        tanggal,
        keterangan,
      },
    });

    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Absensi tidak ditemukan" });
  }
});

// DELETE menghapus absensi
app.delete("/absensi/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.absensi.delete({ where: { id } });

    res.json({ message: "Absensi berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ message: "Absensi tidak ditemukan" });
  }
});

export default app;

