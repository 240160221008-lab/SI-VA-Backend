
/**
 * Pertemuan 4 — Latihan Routing dan Middleware Express.js
 * Nama  : Marsya Nurdrianti
 * NPM   : 240160221022
 *
 * Menjalankan program:
 * node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

const port = 3006;

// Data awal buku
const buku = [
  {
    id: 1,
    judul: "Belajar Node.js",
    penulis: "Andi",
    tersedia: true,
  },
  {
    id: 2,
    judul: "Dasar Express.js",
    penulis: "Budi",
    tersedia: false,
  },
  {
    id: 3,
    judul: "Pemrograman JavaScript",
    penulis: "Siti",
    tersedia: true,
  },
];

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware logger untuk mencatat waktu, method, dan URL
app.use((request, response, next) => {
  const waktu = new Date().toLocaleString("id-ID");

  console.log(
    `[${waktu}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// Route halaman utama
app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "API Buku Marsya",
  });
});

// Route untuk memeriksa status server
app.get("/health", (request, response) => {
  response.json({
    success: true,
    message: "Server berjalan dengan baik",
  });
});

// GET /buku
// Mendapatkan semua buku atau memfilter berdasarkan ketersediaan
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;

  let data = buku;

  if (tersedia !== undefined) {
    if (tersedia !== "true" && tersedia !== "false") {
      return response.status(400).json({
        success: false,
        message: "Query tersedia harus bernilai true atau false",
      });
    }

    data = buku.filter(
      (item) => String(item.tersedia) === tersedia
    );
  }

  return response.json({
    success: true,
    total: data.length,
    data: data,
  });
});

// GET /buku/:id
// Mendapatkan buku berdasarkan ID
app.get("/buku/:id", (request, response) => {
  const id = Number(request.params.id);

  const item = buku.find((item) => item.id === id);

  if (!item) {
    return response.status(404).json({
      success: false,
      message: "Buku tidak ditemukan",
    });
  }

  return response.json({
    success: true,
    data: item,
  });
});

// POST /buku
// Menambahkan buku baru
app.post("/buku", (request, response) => {
  const { judul, penulis } = request.body ?? {};

  if (
    typeof judul !== "string" ||
    judul.trim() === "" ||
    typeof penulis !== "string" ||
    penulis.trim() === ""
  ) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  const idBaru =
    Math.max(...buku.map((item) => item.id), 0) + 1;

  const bukuBaru = {
    id: idBaru,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tersedia: true,
  };

  buku.push(bukuBaru);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: bukuBaru,
  });
});

// Handler untuk endpoint yang tidak ditemukan
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`API Buku Marsya berjalan di http://localhost:${port}`);
  console.log("Uji: curl.exe http://localhost:3006/buku");
});
