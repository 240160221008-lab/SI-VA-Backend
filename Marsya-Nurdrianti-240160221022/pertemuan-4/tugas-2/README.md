# Tugas 2 — REST API Perpustakaan Menggunakan Express.js

**Nama:** Marsya Nurdrianti  
**NPM:** 240160221022

**Mata Kuliah:** SI-VA Backend  
**Pertemuan:** 4  
**Port:** `3006`

---

## 1. Deskripsi

Project ini dibuat untuk mempelajari pembuatan REST API sederhana dengan Node.js dan Express.js. Resource yang digunakan adalah data buku perpustakaan.

Fitur yang tersedia meliputi:

- Menampilkan seluruh data buku.
- Melihat detail buku berdasarkan ID.
- Menambahkan data buku baru.
- Mengubah informasi buku.
- Menghapus data buku.
- Menyaring buku berdasarkan ketersediaannya.
- Memproses route parameter dan query parameter.
- Menggunakan middleware untuk membaca JSON dan mencatat request.
- Memvalidasi data yang dikirim pengguna.
- Menangani endpoint yang tidak tersedia dan error pada server.

Data buku disimpan menggunakan array di dalam program, sehingga belum terhubung dengan database.

---

## 2. Tujuan Pembelajaran

Tujuan pengerjaan tugas ini adalah:

1. Memahami dasar pembuatan REST API dengan Express.js.
2. Membuat endpoint menggunakan berbagai HTTP method.
3. Menggunakan parameter pada URL untuk mengambil data.
4. Menerapkan query parameter sebagai fitur filter.
5. Memahami fungsi middleware pada Express.js.
6. Mengirimkan respons JSON dengan status HTTP yang sesuai.
7. Menangani permintaan menuju endpoint yang tidak tersedia.
8. Melakukan pemeriksaan data sebelum diproses.
9. Menguji endpoint menggunakan Postman.

---

## 3. Teknologi

- **Node.js** — menjalankan kode JavaScript di sisi server.
- **Express.js** — mengatur route dan request API.
- **npm** — mengelola package yang dibutuhkan.
- **Postman** — melakukan pengujian endpoint.
- **JSON** — format data yang dikirim dan diterima API.

---

## 4. Struktur Project

```text
Pertemuan-4/
└── Tugas-2/
    ├── latihan.js
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── screenshots/
        ├── 01-get-daftar-buku.png
        ├── 02-get-detail-buku.png
        ├── 03-post-tambah-buku.png
        ├── 04-put-ubah-buku.png
        ├── 05-delete-buku.png
        ├── 06-get-buku-404.png
        ├── 07-filter-tersedia-true.png
        ├── 08-filter-tersedia-false.png
        ├── 09-post-validasi-400.png
        └── 10-endpoint-404.png
```

**Catatan:** Folder `screenshots` dan nama file gambar di atas merupakan susunan yang disarankan. Buat folder tersebut dan masukkan screenshot hasil pengujian yang benar-benar sudah dilakukan.

---

## 5. Fungsi File

| File/Folder | Kegunaan |
|---|---|
| `latihan.js` | Menyimpan kode server, data buku, middleware, route, dan penanganan error. |
| `package.json` | Menyimpan konfigurasi project dan daftar dependency. |
| `package-lock.json` | Menyimpan rincian versi dependency yang terpasang. |
| `README.md` | Menjelaskan cara menjalankan program dan dokumentasi API. |
| `screenshots/` | Menyimpan gambar bukti pengujian melalui Postman. |

---

## 6. Instalasi

Sebelum menjalankan program, pastikan Node.js dan npm sudah tersedia.

Buka terminal, lalu masuk ke folder project:

```bash
cd Pertemuan-4/Tugas-2
```

Pasang Express.js dengan perintah:

```bash
npm install express
```

Pastikan `package.json` menggunakan konfigurasi ES Module apabila kode memakai sintaks `import`:

```json
{
  "type": "module"
}
```

Jika dependency sudah terpasang, program dapat dilanjutkan ke tahap menjalankan server.

---

## 7. Menjalankan Server

Jalankan program menggunakan perintah berikut:

```bash
node latihan.js
```

Jika server berhasil berjalan, terminal akan menampilkan pesan bahwa API tersedia di alamat berikut:

```text
http://localhost:3006
```

Alamat tersebut digunakan sebagai dasar untuk menguji endpoint melalui Postman.

Selama proses pengujian berlangsung, terminal harus tetap terbuka dan server tidak boleh dihentikan.

---

# 8. Daftar Endpoint

| No. | Method | Endpoint | Keterangan |
|---:|---|---|---|
| 1 | GET | `/buku` | Mengambil semua data buku. |
| 2 | GET | `/buku/:id` | Mengambil detail buku tertentu. |
| 3 | POST | `/buku` | Menambahkan buku baru. |
| 4 | PUT | `/buku/:id` | Memperbarui data buku. |
| 5 | DELETE | `/buku/:id` | Menghapus buku berdasarkan ID. |
| 6 | GET | `/buku?tersedia=true` | Menampilkan buku yang tersedia. |
| 7 | GET | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia. |

---

# 9. Route Parameter

Route parameter digunakan ketika API perlu mengambil data berdasarkan nilai tertentu pada URL. Pada project ini, parameter `id` digunakan untuk menentukan buku yang ingin dilihat, diperbarui, atau dihapus.

Contoh request:

```http
GET http://localhost:3006/buku/1
```

Pada URL tersebut, angka `1` merupakan nilai ID buku yang dicari.

Bentuk route yang digunakan adalah:

```text
/buku/:id
```

Jika ID ditemukan, API mengirimkan data buku yang sesuai. Jika tidak ditemukan, API memberikan respons `404 Not Found`.

---

# 10. Query Parameter

Query parameter digunakan untuk menyaring daftar buku berdasarkan status ketersediaannya.

### Buku yang tersedia

```http
GET http://localhost:3006/buku?tersedia=true
```

Request ini digunakan untuk mengambil buku dengan nilai `tersedia` bernilai `true`.

### Buku yang tidak tersedia

```http
GET http://localhost:3006/buku?tersedia=false
```

Request ini menampilkan buku dengan nilai `tersedia` bernilai `false`.

### Tanpa filter

```http
GET http://localhost:3006/buku
```

Jika parameter filter tidak dicantumkan, API akan menampilkan seluruh data buku.

---

# 11. Contoh Request dan Response

Contoh berikut merupakan gambaran format pengujian. Sesuaikan data respons dengan hasil aktual dari kode yang dijalankan.

## 11.1 GET — Daftar Buku

**Request**

```http
GET http://localhost:3006/buku
```

**Contoh response**

```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Yosep Adipura H",
      "tersedia": true
    },
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "penulis": "Mulky",
      "tersedia": false
    },
    {
      "id": 3,
      "judul": "Pemrograman JavaScript",
      "penulis": "Siti",
      "tersedia": true
    }
  ]
}
```

Status yang diharapkan: `200 OK`.

**Bukti pengujian:** Simpan screenshot Postman dengan nama `01-get-daftar-buku.png`.

## 11.2 GET — Detail Buku

**Request**

```http
GET http://localhost:3006/buku/1
```

**Contoh response**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Belajar Node.js",
    "penulis": "Yosep Adipura H",
    "tersedia": true
  }
}
```

Status yang diharapkan: `200 OK`.

**Bukti pengujian:** Simpan screenshot dengan nama `02-get-detail-buku.png`.

## 11.3 POST — Menambahkan Buku

**Request**

```http
POST http://localhost:3006/buku
```

Gunakan header `Content-Type: application/json` dan masukkan body berikut:

```json
{
  "judul": "Belajar Backend",
  "penulis": "Marsya Nurdrianti"
}
```

**Contoh response**

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 4,
    "judul": "Belajar Backend",
    "penulis": "Marsya Nurdrianti",
    "tersedia": true
  }
}
```

Status yang diharapkan: `201 Created`.

ID dan isi respons perlu disesuaikan dengan hasil aktual. Jika array awal berisi tiga buku dan belum ada perubahan data, buku baru biasanya mendapat ID `4`.

**Bukti pengujian:** Simpan screenshot dengan nama `03-post-tambah-buku.png`.

## 11.4 PUT — Memperbarui Buku

**Request**

```http
PUT http://localhost:3006/buku/1
```

Header: `Content-Type: application/json`.

Contoh body:

```json
{
  "judul": "Belajar Backend Express.js",
  "penulis": "Marsya Nurdrianti",
  "tersedia": false
}
```

Request ini digunakan untuk mengubah informasi buku dengan ID `1`.

Status yang diharapkan: `200 OK` jika pembaruan berhasil.

**Bukti pengujian:** Simpan screenshot dengan nama `04-put-ubah-buku.png`.

## 11.5 DELETE — Menghapus Buku

**Request**

```http
DELETE http://localhost:3006/buku/1
```

Request ini menghapus buku yang memiliki ID `1` jika data tersebut ditemukan.

Status yang diharapkan: `200 OK` apabila kode mengembalikan respons tersebut setelah penghapusan berhasil.

**Bukti pengujian:** Simpan screenshot dengan nama `05-delete-buku.png`.

---

# 12. Pengujian Error dan Validasi

## 12.1 Mencari Buku yang Tidak Ada

**Request**

```http
GET http://localhost:3006/buku/999
```

**Contoh response**

```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

Status yang diharapkan: `404 Not Found`.

**Bukti pengujian:** Simpan screenshot dengan nama `06-get-buku-404.png`.

## 12.2 Filter Buku Tersedia

**Request**

```http
GET http://localhost:3006/buku?tersedia=true
```

Hasil yang ditampilkan hanya buku dengan status:

```json
{
  "tersedia": true
}
```

Status yang diharapkan: `200 OK`.

**Bukti pengujian:** Simpan screenshot dengan nama `07-filter-tersedia-true.png`.

## 12.3 Filter Buku Tidak Tersedia

**Request**

```http
GET http://localhost:3006/buku?tersedia=false
```

Hasil yang ditampilkan hanya buku dengan status:

```json
{
  "tersedia": false
}
```

Status yang diharapkan: `200 OK`.

**Bukti pengujian:** Simpan screenshot dengan nama `08-filter-tersedia-false.png`.

## 12.4 Validasi POST

Pengujian validasi dilakukan dengan mengirimkan data yang tidak lengkap, misalnya tanpa field `penulis`.

**Request**

```http
POST http://localhost:3006/buku
```

Body:

```json
{
  "judul": "Buku Tanpa Penulis"
}
```

**Contoh response**

```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

Status yang diharapkan: `400 Bad Request`.

Pesan respons harus mengikuti pesan yang benar-benar ditulis pada kode `latihan.js`.

**Bukti pengujian:** Simpan screenshot dengan nama `09-post-validasi-400.png`.

## 12.5 Endpoint Tidak Ditemukan

**Request**

```http
GET http://localhost:3006/halaman-tidak-ada
```

**Contoh response**

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

Status yang diharapkan: `404 Not Found`.

**Bukti pengujian:** Simpan screenshot dengan nama `10-endpoint-404.png`.

---

# 13. Middleware

## 13.1 Middleware JSON

Express menyediakan middleware berikut untuk membaca request body dalam format JSON:

```javascript
app.use(express.json());
```

Middleware ini diperlukan agar data JSON yang dikirim melalui request POST dan PUT dapat dibaca oleh aplikasi.

## 13.2 Middleware Logger

Middleware logger dapat digunakan untuk mencatat aktivitas request yang masuk ke server, seperti:

- Waktu request diterima.
- HTTP method yang digunakan.
- URL endpoint yang diakses.

Contoh bentuk catatan pada terminal:

```text
[Waktu request] GET /buku
```

Catatan tersebut membantu proses pemeriksaan ketika endpoint diuji menggunakan Postman.

**Catatan:** Bagian logger hanya sesuai apabila middleware pencatat request memang tersedia di dalam kode.

---

# 14. Handler 404

Handler 404 digunakan untuk menangani request yang menuju alamat endpoint yang tidak terdaftar pada aplikasi.

Sebagai contoh, pengguna mengakses:

```http
GET http://localhost:3006/halaman-tidak-ada
```

API dapat mengirimkan respons berikut:

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

Status HTTP yang digunakan adalah `404 Not Found`.

Handler ini membantu memberikan informasi yang jelas ketika pengguna meminta alamat API yang tidak tersedia.

---

# 15. Error Middleware

Error middleware digunakan untuk menangani error yang diteruskan ke mekanisme penanganan error Express.js.

Bentuk umum middleware error adalah:

```javascript
(error, req, res, next)
```

Middleware tersebut dapat digunakan untuk memberikan respons JSON ketika terjadi kesalahan pada server. Jika terjadi error internal yang tidak dapat diproses, status yang dapat digunakan adalah `500 Internal Server Error`.

Respons dan status yang dikirim harus mengikuti implementasi yang terdapat pada kode aplikasi.

---

# 16. Hasil Pengujian

Tabel berikut merupakan daftar skenario yang perlu diuji menggunakan Postman. Kolom hasil diisi setelah pengujian benar-benar dilakukan.

| No. | Skenario | Method | Status yang Diharapkan |
|---:|---|---|---|
| 1 | Menampilkan semua buku | GET | `200 OK` |
| 2 | Melihat detail buku | GET | `200 OK` |
| 3 | Menambahkan buku baru | POST | `201 Created` |
| 4 | Memperbarui data buku | PUT | `200 OK` |
| 5 | Menghapus buku | DELETE | `200 OK` |
| 6 | Mencari ID yang tidak tersedia | GET | `404 Not Found` |
| 7 | Memfilter buku tersedia | GET | `200 OK` |
| 8 | Memfilter buku tidak tersedia | GET | `200 OK` |
| 9 | Mengirim data POST tidak lengkap | POST | `400 Bad Request` |
| 10 | Mengakses endpoint yang tidak ada | GET | `404 Not Found` |

Status di atas merupakan target pengujian, bukan pernyataan bahwa seluruh skenario sudah berhasil. Isi hasil akhir berdasarkan respons yang muncul pada Postman.

---

# 17. Bukti Screenshot Pengujian

Screenshot digunakan sebagai dokumentasi bahwa setiap fitur telah dicoba.

Simpan gambar hasil pengujian di folder:

```text
screenshots/
```

Daftar screenshot yang disarankan:

1. `01-get-daftar-buku.png`
2. `02-get-detail-buku.png`
3. `03-post-tambah-buku.png`
4. `04-put-ubah-buku.png`
5. `05-delete-buku.png`
6. `06-get-buku-404.png`
7. `07-filter-tersedia-true.png`
8. `08-filter-tersedia-false.png`
9. `09-post-validasi-400.png`
10. `10-endpoint-404.png`

Pastikan setiap gambar menunjukkan URL request, HTTP method, status respons, dan body respons yang relevan. Jika nama file berbeda, sesuaikan referensi gambar dalam README.

---

# 18. Catatan

Aplikasi ini menggunakan array sebagai tempat penyimpanan data buku. Oleh karena itu:

- Program belum memakai database eksternal.
- Data baru hanya tersimpan selama proses server berjalan.
- Data dapat kembali ke kondisi awal ketika server dijalankan ulang.
- Fitur yang dibuat berfokus pada pemahaman REST API dan penggunaan Express.js.

---

# 19. Kesimpulan

Melalui tugas ini, kami mempelajari pembuatan REST API untuk pengelolaan data buku menggunakan Express.js. API dirancang untuk mendukung operasi membaca, menambahkan, memperbarui, dan menghapus data.

Selain operasi CRUD, project ini juga membahas penggunaan route parameter, query parameter, middleware, validasi input, status HTTP, serta penanganan endpoint dan error.

Pengujian menggunakan Postman dilakukan untuk memeriksa apakah setiap fitur memberikan respons yang sesuai dengan kebutuhan aplikasi.
