# Refleksi Pengalaman Pembelajaran & Penggunaan AI

**Nama:** Rissa Srihandita  
**NPM:** 240160221041  

## 1. Penggunaan Generative AI dalam Proyek
Dalam pengerjaan proyek ini, AI digunakan sebagai asisten pemrograman untuk:
- Membantu menyusun arsitektur HTTP Server menggunakan modul native `node:http` tanpa dependensi eksternal (seperti Express.js).
- Memberikan solusi atas masalah sintaksis pada environment Windows PowerShell (seperti resolusi eksekusi `curl` dan *environment variables*).
- Menjelaskan implementasi *asynchronous I/O* dengan `node:fs/promises` dan penanganan error menggunakan blok `try/catch`.

## 2. Hasil Pengujian dan Evaluasi
- **Konfigurasi Modul ESM:** Konfigurasi berhasil terpisah di `config.js` dan nilai *fallback default* berjalan lancar saat *environment variables* tidak diset.
- **Routing & HTTP Status Code:** Tiga endpoint utama (`/`, `/health`, `/absensi`) merespons dengan status `200 OK` dan struktur JSON yang konsisten. Endpoint yang tidak terdaftar berhasil menangkap *request* dan memberikan status `404 Not Found`.
- **Integrasi File System:** Fungsi pembacaan `absensi.json` berjalan secara non-blocking menggunakan `async/await` dan menangani kegagalan pembacaan secara aman tanpa membuat server *crash*.

## 3. Hal yang Masih Perlu Dipahami Lebih Lanjut
- **Parsing Request Body pada Native Node.js:** Cara menangani *stream data* (`req.on('data')` dan `req.on('end')`) untuk *method* `POST` atau `PUT` tanpa bantuan *middleware body-parser*.
- **Keamanan dan Validasi URL:** Penanganan *query string* serta penanganan *CORS (Cross-Origin Resource Sharing)* pada HTTP Server murni.