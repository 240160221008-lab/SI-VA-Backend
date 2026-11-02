# Latihan Individu Pertemuan 4 — Express.js Dasar

**MARSYA NURDRIANTI**  
**240160221022**

## Deskripsi

Latihan ini merupakan implementasi dasar Express.js untuk memahami penggunaan routing, route parameter, query parameter, middleware, request body, dan HTTP status code.

Aplikasi yang dibuat adalah API sederhana untuk mengelola data buku.

## Teknologi

- Node.js
- Express.js
- JavaScript ES Module
- REST API
- cURL untuk pengujian

## Struktur Folder

```text
pertemuan-04/
├── latihan.js
├── package.json
├── package-lock.json
└── README.md
```

## Cara Menjalankan

Pastikan Node.js sudah terpasang dan terminal berada di folder yang berisi file `latihan.js`.

### 1. Install Dependency

Jalankan perintah berikut jika Express.js belum terpasang:

```bash
npm install express
```

Pastikan `package.json` memiliki properti `"type": "module"` agar sintaks `import` dapat digunakan.

### 2. Menjalankan Aplikasi

```bash
node latihan.js
```

Jika berhasil, terminal akan menampilkan:

```text
API Buku Marsya berjalan di http://localhost:3006
Uji: curl.exe http://localhost:3006/buku
```

Server berjalan pada port `3006`. Biarkan terminal tetap terbuka selama pengujian.

## Fitur yang Dibuat

### 1. Middleware Logger

Middleware logger digunakan untuk mencatat waktu request, method HTTP, dan URL yang diakses.

Contoh hasil pada terminal:

```text
[19/10/2026, 12.00.00] GET /buku
[19/10/2026, 12.00.05] GET /buku?tersedia=true
```

Waktu pada contoh tersebut hanya ilustrasi dan akan menyesuaikan waktu ketika aplikasi dijalankan.

### 2. Menampilkan Semua Buku

Endpoint:

```http
GET /buku
```

Pengujian:

```powershell
curl.exe http://localhost:3006/buku
```

Endpoint ini menampilkan seluruh data buku yang tersedia dalam aplikasi.

### 3. Filter Buku Berdasarkan Ketersediaan

Endpoint untuk menampilkan buku yang tersedia:

```http
GET /buku?tersedia=true
```

Pengujian:

```powershell
curl.exe "http://localhost:3006/buku?tersedia=true"
```

Untuk menampilkan buku yang tidak tersedia:

```powershell
curl.exe "http://localhost:3006/buku?tersedia=false"
```

Query parameter `tersedia` digunakan untuk memfilter buku berdasarkan status ketersediaannya. Jika nilainya bukan `true` atau `false`, API memberikan status `400 Bad Request`.

### 4. Mencari Buku Berdasarkan ID

Endpoint:

```http
GET /buku/:id
```

Contoh pengujian:

```powershell
curl.exe http://localhost:3006/buku/1
```

Jika buku ditemukan, API memberikan response dengan status `200 OK`.

Jika ID buku tidak ditemukan:

```powershell
curl.exe http://localhost:3006/buku/99
```

API memberikan status `404 Not Found` dengan response:

```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

### 5. Menambahkan Buku

Endpoint:

```http
POST /buku
```

Field yang wajib dikirim adalah `judul` dan `penulis`.

Contoh pengujian:

```powershell
curl.exe -X POST http://localhost:3006/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar API\",\"penulis\":\"Marsya\"}"
```

Jika berhasil, API memberikan status `201 Created` dengan response berupa data buku yang baru ditambahkan.

Contoh response:

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 4,
    "judul": "Belajar API",
    "penulis": "Marsya",
    "tersedia": true
  }
}
```

ID `4` berlaku jika tiga data awal masih utuh dan belum ada buku lain yang ditambahkan.

### 6. Validasi Data Buku

Field `judul` dan `penulis` wajib diisi dan tidak boleh berupa teks kosong.

Contoh pengujian:

```powershell
curl.exe -X POST http://localhost:3006/buku -H "Content-Type: application/json" -d "{\"judul\":\"\",\"penulis\":\"Marsya\"}"
```

API memberikan status `400 Bad Request` dengan response:

```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

### 7. Handler Endpoint Tidak Ditemukan

Jika endpoint yang diakses tidak tersedia, aplikasi memberikan response `404 Not Found`.

Contoh pengujian:

```powershell
curl.exe http://localhost:3006/abc
```

Response:

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

### 8. Memeriksa Status Server

Endpoint:

```http
GET /health
```

Pengujian:

```powershell
curl.exe http://localhost:3006/health
```

Endpoint ini digunakan untuk memeriksa apakah server berjalan dengan baik.

## Daftar Endpoint

| Method | Endpoint | Keterangan | Status |
|---|---|---|---|
| GET | `/` | Menampilkan informasi API | 200 |
| GET | `/health` | Memeriksa status server | 200 |
| GET | `/buku` | Menampilkan semua buku | 200 |
| GET | `/buku?tersedia=true` | Menampilkan buku yang tersedia | 200 |
| GET | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia | 200 |
| GET | `/buku/:id` | Mencari buku berdasarkan ID | 200 / 404 |
| POST | `/buku` | Menambahkan buku baru | 201 / 400 |
| GET/POST | Endpoint lain | Endpoint tidak ditemukan | 404 |

Query `tersedia` dengan nilai selain `true` atau `false` juga menghasilkan status `400`.

## Hasil Pengujian

Pengujian dilakukan menggunakan cURL melalui terminal dengan server pada port `3006`.

### Pengujian GET `/buku`

```powershell
curl.exe http://localhost:3006/buku
```

Hasil yang diharapkan: menampilkan seluruh data buku.

### Pengujian Filter Buku

```powershell
curl.exe "http://localhost:3006/buku?tersedia=true"
```

Hasil yang diharapkan: menampilkan buku yang tersedia.

```powershell
curl.exe "http://localhost:3006/buku?tersedia=false"
```

Hasil yang diharapkan: menampilkan buku yang tidak tersedia.

### Pengujian GET `/buku/:id`

```powershell
curl.exe http://localhost:3006/buku/1
```

Hasil yang diharapkan: menampilkan data buku berdasarkan ID.

```powershell
curl.exe http://localhost:3006/buku/99
```

Hasil yang diharapkan: memberikan status `404` ketika buku tidak ditemukan.

### Pengujian POST `/buku`

Pengujian dilakukan dengan mengirimkan data judul dan penulis. Jika berhasil, API memberikan status `201`.

### Pengujian Validasi

Pengujian dengan judul kosong atau field wajib yang tidak dikirimkan seharusnya menghasilkan status `400`.

### Pengujian Endpoint Tidak Ditemukan

```powershell
curl.exe http://localhost:3006/abc
```

Hasil yang diharapkan: memberikan status `404` karena endpoint tidak tersedia.

## Kesimpulan

Pada latihan ini telah diterapkan fitur dasar Express.js, yaitu middleware logger, routing, route parameter, query parameter, request body, validasi input, dan handler 404.

Melalui latihan ini, API sederhana untuk pengelolaan data buku dapat menerima request, memproses data, dan memberikan response sesuai dengan kondisi request yang diberikan.

Data buku masih disimpan di dalam array JavaScript sehingga perubahan data tidak tersimpan setelah server dimulai ulang.