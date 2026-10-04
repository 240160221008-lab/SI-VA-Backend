/**
 * ============================================================
 * Demo Pertemuan 2 & 3 — Asynchronous & ES6+ (Studi Kasus Absensi)
 * ============================================================
 * Menggabungkan konsep ES6+ dan Asynchronous JS untuk backend
 * Node.js murni (ESM dengan top-level await).
 *
 * Jalankan:
 *    node demo.js
 */

import { setTimeout as delay } from "node:timers/promises";
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "./absensiService.js";

console.log("=== DEMO INTEGRASI ABSENSI SERVICE & ES6+ ===\n");

// ============================================================
// 1. ES6+ Features Review (Destructuring, Spread, Modern Syntax)
// ============================================================
console.log("1. --- ES6+ & Destructuring ---");
const configApp = { namaApp: "Absensi Organisasi", versi: "1.0.0", port: 3000 };
const { namaApp, port, statusAktif = true } = configApp; // Destructuring + Default value
console.log(`App: ${namaApp} berjalan di port ${port} | Status: ${statusAktif}`);

// ============================================================
// 2. Operasi Async Service (CRUD Demo)
// ============================================================
console.log("\n2. --- Operasi Service Async (CRUD) ---");

// CREATE
const dataBaru = await create({
  nama: "Rissa",
  status: "Hadir",
  tanggal: "2026-09-28",
});
console.log("2.1 Create (Tambahkan data baru):", dataBaru);

// READ (findById)
const dataId1 = await findById(1);
console.log("2.2 FindById (Cari ID 1):", dataId1?.nama ?? "Tidak Ditemukan"); // Optional chaining + Nullish Coalescing

// UPDATE (PATCH)
const dataUpdated = await update(2, { status: "Hadir" });
console.log("2.3 Update Status ID 2:", dataUpdated);

// DELETE
const dataDeleted = await remove(1);
console.log("2.4 Delete ID 1:", dataDeleted?.nama, "berhasil dihapus");

// ============================================================
// 3. Promise.all — Eksekusi Kueri Paralel
// ============================================================
console.log("\n3. --- Promise.all (Kueri Paralel) ---");
const mulai = Date.now();

// 2 kueri dijalankan bersamaan
const [semuaData, totalHadir] = await Promise.all([
  findAll(),
  findAll().then((data) => data.filter((a) => a.status === "Hadir").length),
]);

console.log("Hasil Kueri Paralel:", {
  totalRecord: semuaData.length,
  jumlahHadir: totalHadir,
});
console.log(`Waktu Eksekusi Paralel: ±${Date.now() - mulai}ms`);

// ============================================================
// 4. Handling Error dengan try / catch / finally
// ============================================================
console.log("\n4. --- Try / Catch untuk Kasus ID Tidak Ditemukan ---");

try {
  const idCari = 999; // ID yang sengaja dibuat tidak ada
  console.log(`Mencari data absensi dengan ID: ${idCari}...`);
  
  const hasil = await findById(idCari);

  if (!hasil) {
    throw new Error(`Data absensi dengan ID ${idCari} tidak ditemukan!`);
  }

  console.log("Data ditemukan:", hasil);
} catch (error) {
  console.error("❌ Catch menangkap error:", error.message);
} finally {
  console.log("✔ Process Finally: Pengujian error handling selesai.");
}

console.log("\nSemua demo absensi berhasil dijalankan.");