/**
 * ============================================================
 * Pertemuan 2 — Absensi Service
 * ============================================================
 * Layer "service" memisahkan LOGIKA BISNIS dari HTTP.
 * Menggunakan Node.js murni dengan modul ES (ESM).
 *
 * Jalankan:
 *   node absensiService.js
 */

import { setTimeout as delay } from "node:timers/promises";

// "Database" in-memory + id berjalan
let absensi = [
  { id: 1, nama: "Rissa", status: "Hadir", tanggal: "2026-09-28" },
  { id: 2, nama: "Dita", status: "Izin", tanggal: "2026-09-28" },
];
let nextId = 3;

// ---------- Service: semua fungsi async + return object hasil ----------
export async function findAll() {
  await delay(100); // seolah query SELECT
  return absensi;
}

export async function findById(id) {
  await delay(100);
  return absensi.find((a) => a.id === Number(id)) ?? null;
}

export async function create({ nama, status = "Hadir", tanggal }) {
  await delay(100);
  const baru = { id: nextId++, nama, status, tanggal };
  absensi.push(baru);
  return baru;
}

export async function update(id, data) {
  const found = await findById(id);
  if (!found) return null;
  Object.assign(found, data); // spread-based partial update (PATCH)
  return found;
}

export async function remove(id) {
  await delay(100);
  const index = absensi.findIndex((a) => a.id === Number(id));
  if (index === -1) return null;
  const [deleted] = absensi.splice(index, 1);
  return deleted;
}

// ---------- Demo ----------
console.log("Daftar awal:", (await findAll()).length, "absensi");

// Destructuring saat menerima hasil service
const { id, nama } = await create({
  nama: "Rissa",
  status: "Hadir",
  tanggal: "2026-09-28",
});
console.log("Absensi baru:", { id, nama });

console.log("Absensi id 2:", (await findById(2))?.nama);

const diubah = await update(2, { status: "Hadir" }); // PATCH: sebagian field saja
console.log("Setelah update status:", { id: diubah.id, status: diubah.status });

// Promise.all: hitung statistik paralel
const [total, hadir] = await Promise.all([
  findAll().then((all) => all.length),
  findAll().then((all) => all.filter((a) => a.status === "Hadir").length),
]);
console.log(`Statistik: ${total} total absensi, ${hadir} status hadir`);