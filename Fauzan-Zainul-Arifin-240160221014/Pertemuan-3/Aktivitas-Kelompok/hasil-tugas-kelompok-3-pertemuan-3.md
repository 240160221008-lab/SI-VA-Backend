# Aktivitas Kelompok — Pertemuan 3

## Identitas Kelompok

**Anggota Kelompok 3:**
1. Devaldy Zikri S
2. Eka Bareeq
3. Faishal Rizky F
4. Fauzan Zainul Arifin

## Studi Kasus

Aktivitas kelompok pada Pertemuan 3 membahas dasar-dasar Node.js, 
penggunaan runtime, module, HTTP server, serta asynchronous process 
dalam pembuatan backend tanpa menggunakan Express.js.

---

## 1. Analisis Runtime

### Browser vs Node.js

Browser dan Node.js sama-sama dapat menjalankan JavaScript, tetapi 
memiliki lingkungan dan API yang berbeda.

| Browser | Node.js |
|---|---|
| `window` | `process` |
| `document` | `fs` |
| `localStorage` | `node:fs/promises` |
| Web APIs | Built-in Node.js APIs |
| Berjalan di browser | Berjalan di server/runtime Node.js |

Browser menyediakan API yang berhubungan dengan halaman web dan 
interaksi pengguna, sedangkan Node.js menyediakan API untuk kebutuhan 
backend seperti filesystem, HTTP server, process, dan environment variable.

### Kesimpulan

JavaScript yang dijalankan di browser dan Node.js memiliki kemampuan 
yang berbeda karena masing-masing memiliki runtime dan API yang berbeda.

---

## 2. Perancangan Module

Dalam pembuatan aplikasi backend, kode dapat dipisahkan menjadi 
beberapa module agar lebih mudah dikelola.

Contoh pembagian:

- `config.js` digunakan untuk konfigurasi aplikasi.
- `server.js` digunakan untuk menjalankan HTTP server dan routing.
- Response helper digunakan untuk membuat response JSON secara konsisten.

Contoh struktur:

```text
project/
├── config.js
├── server.js
└── data/
    └── mahasiswa.json