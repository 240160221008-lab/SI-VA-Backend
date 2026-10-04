/**
 * ============================================================
 * Demo Pertemuan 3 — HTTP Server Node.js tanpa Express
 * ============================================================
 * Tujuan:
 *   1. Menggunakan module bawaan node:http.
 *   2. Membaca environment variable untuk konfigurasi port dan COURSE_CODE.
 *   3. Menyusun response JSON dengan routing sederhana.
 *
 * Jalankan:
 *   node server.js
 *
 * Uji pada terminal lain:
 *   curl http://localhost:3003/
 *   curl http://localhost:3003/health
 *   curl http://localhost:3003/students
 *   curl http://localhost:3003/tidak-ada
 *
 * Hentikan server dengan Ctrl+C.
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

// Function untuk membaca file JSON dengan try/catch
export async function bacaJSON(namaFile) {
  try {
    const filePath = path.join(import.meta.dirname, namaFile);
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`[Error] Gagal membaca file ${namaFile}:`, error.message);
    return null;
  }
}

// Data mahasiswa untuk endpoint GET /students
const dataStudents = [
  { npm: "240160221041", nama: "Rissa Srihandita", prodi: "Teknik Informatika" },
  { npm: "240160221001", nama: "Budi Santoso", prodi: "Sistem Informasi" },
];

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer((request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE,
      endpoints: ["GET /", "GET /health", "GET /students"],
    });
  }

  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
    });
  }

  // Endpoint GET /students
  if (method === "GET" && url === "/students") {
    return sendJSON(response, 200, {
      success: true,
      data: dataStudents,
    });
  }

  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} (${COURSE_CODE}) berjalan di http://localhost:${PORT}`);
});