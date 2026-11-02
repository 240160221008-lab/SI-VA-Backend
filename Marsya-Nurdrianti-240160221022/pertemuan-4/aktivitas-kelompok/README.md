# TUGAS KELOMPOK — PERTEMUAN 4

## Anggota Kelompok 6
1. Dadika Yudiana
2. Faatin Ashri Widiatin
3. Marsya Nurdrianti

## 1. Pemetaan Alur

Pada Pertemuan 3, proses routing dibuat menggunakan modul `node:http`. Pada Pertemuan 4, proses tersebut dikembangkan dengan Express.js agar pengaturan route dan middleware menjadi lebih praktis.

Route yang digunakan dalam praktikum ini adalah:

```text
GET /students
```

### Alur Request

```text
Client
   ↓
HTTP Request
   ↓
Logger Middleware
   ↓
JSON Parser
   ↓
Route GET /students
   ↓
Response JSON
   ↓
Client
```

Ketika client mengirim request, server akan memprosesnya melalui middleware sesuai urutan yang telah ditentukan. Setelah itu, request diteruskan ke route yang sesuai untuk menghasilkan response.

### Contoh Route Express

```javascript
app.get("/students", (request, response) => {
  response.status(200).json({
    success: true,
    data: students,
  });
});
```

---

## 2. Susunan Middleware

Middleware pada Express dijalankan berdasarkan urutan penulisannya di dalam program. Susunan yang digunakan adalah:

```text
1. Logger
2. JSON Parser
3. Route
4. 404 Handler
5. Error Handler
```

### 1. Logger

Logger berfungsi mencatat setiap request yang masuk ke server. Middleware ini diletakkan di awal agar request dapat tercatat sebelum diproses lebih lanjut.

```javascript
app.use((request, response, next) => {
  console.log(
    `${request.method} ${request.originalUrl}`
  );

  next();
});
```

### 2. JSON Parser

JSON parser digunakan untuk membaca data yang dikirim client dalam format JSON melalui request body.

```javascript
app.use(express.json());
```

### 3. Route

Route berfungsi menentukan proses yang dijalankan berdasarkan method dan URL yang diminta client.

Contoh route untuk menampilkan data mahasiswa:

```javascript
app.get("/students", (request, response) => {
  response.status(200).json({
    success: true,
    data: students,
  });
});
```

### 4. 404 Handler

Middleware ini digunakan apabila client mengakses URL yang tidak memiliki route yang sesuai.

```javascript
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});
```

### 5. Error Handler

Error handler berfungsi menangani kesalahan yang terjadi saat request diproses oleh middleware atau route sebelumnya. Posisi middleware ini berada di bagian akhir.

```javascript
app.use((error, request, response, next) => {
  console.error(error);

  response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});
```

---

## 3. Contoh Implementasi Express.js

Berikut contoh program sederhana menggunakan Express.js untuk menampilkan data mahasiswa melalui endpoint `/students`.

```javascript
import express from "express";

const app = express();
const port = 3004;

const students = [
  {
    id: 1,
    nim: "240160221022",
    nama: "Marsya Nurdrianti",
  },
  {
    id: 2,
    nim: "240160221008",
    nama: "Della Kartika",
  },
];

app.use((request, response, next) => {
  console.log(
    `${request.method} ${request.originalUrl}`
  );

  next();
});

app.use(express.json());

app.get("/students", (request, response) => {
  response.status(200).json({
    success: true,
    total: students.length,
    data: students,
  });
});

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

app.use((error, request, response, next) => {
  console.error(error);

  response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

app.listen(port, () => {
  console.log(
    `Server berjalan di http://localhost:${port}`
  );
});
```

**Keterangan:** Program di atas menggunakan Express untuk mengatur route, membaca request JSON, mencatat aktivitas request, dan memberikan response kepada client.

---

## 4. Pengujian Request Menggunakan Curl

Pengujian dilakukan menggunakan `curl` untuk melihat respons server terhadap beberapa kondisi request.

### 4.1 Request Berhasil

**Method:**

```text
GET
```

**URL:**

```text
http://localhost:3004/students
```

**Perintah:**

```bash
curl http://localhost:3004/students
```

**Status Code:**

```text
200 OK
```

**Response JSON:**

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "nim": "240160221022",
      "nama": "Marsya Nurdrianti"
    },
    {
      "id": 2,
      "nim": "240160221008",
      "nama": "Della Kartika"
    }
  ]
}
```

**Keterangan:**

Request berhasil diproses karena endpoint `/students` tersedia dan server dapat mengirimkan data mahasiswa dalam format JSON.

---

### 4.2 Pengujian Body Tidak Lengkap

Pengujian ini bertujuan mengetahui respons server ketika data yang dikirim client belum lengkap.

**Method:**

```text
POST
```

**URL:**

```text
http://localhost:3004/students
```

**Perintah:**

```bash
curl -X POST http://localhost:3004/students -H "Content-Type: application/json" -d "{\"nama\":\"Mahasiswa Baru\"}"
```

**Status Code yang Diharapkan:**

```text
400 Bad Request
```

**Response JSON yang Diharapkan:**

```json
{
  "success": false,
  "message": "nim dan nama wajib diisi"
}
```

**Keterangan:**

Request seharusnya ditolak karena data NIM belum disertakan. Namun, agar hasil pengujian ini benar-benar muncul, route `POST /students` beserta validasi datanya harus ditambahkan terlebih dahulu ke program.

---

### 4.3 Pengujian Data Mahasiswa Tidak Ditemukan

Pengujian ini digunakan untuk memeriksa kondisi ketika client meminta data mahasiswa dengan ID yang tidak tersedia.

**Method:**

```text
GET
```

**URL:**

```text
http://localhost:3004/students/99
```

**Perintah:**

```bash
curl http://localhost:3004/students/99
```

**Status Code yang Diharapkan:**

```text
404 Not Found
```

**Response JSON yang Diharapkan:**

```json
{
  "success": false,
  "message": "Student tidak ditemukan"
}
```

**Keterangan:**

ID `99` tidak terdapat dalam data mahasiswa. Agar server memberikan pesan tersebut secara khusus, route `GET /students/:id` perlu dibuat terlebih dahulu.

---

### 4.4 Pengujian Endpoint Tidak Tersedia

Pengujian ini dilakukan dengan mengakses URL yang tidak terdaftar di dalam program.

**Method:**

```text
GET
```

**URL:**

```text
http://localhost:3004/salah
```

**Perintah:**

```bash
curl http://localhost:3004/salah
```

**Status Code:**

```text
404 Not Found
```

**Response JSON:**

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

**Keterangan:**

Server memberikan status `404` karena endpoint `/salah` tidak tersedia. Request tersebut kemudian ditangani oleh middleware 404.

---

## 5. Rekapitulasi Hasil Pengujian

| No. | Method | URL | Status Code | Keterangan |
|---|---|---|---|---|
| 1 | GET | `/students` | 200 | Data mahasiswa berhasil ditampilkan |
| 2 | POST | `/students` | 400 | Data yang dikirim belum lengkap |
| 3 | GET | `/students/99` | 404 | Data mahasiswa tidak ditemukan |
| 4 | GET | `/salah` | 404 | Endpoint tidak tersedia |

*Catatan: Status pada pengujian nomor 2 dan 3 merupakan hasil yang diharapkan apabila route dan validasinya sudah diterapkan.*

---

## 6. Penggunaan Status Code

Status code digunakan untuk menjelaskan hasil pemrosesan request oleh server.

- **200 OK** menandakan request berhasil diproses.
- **400 Bad Request** menunjukkan data request tidak lengkap atau tidak sesuai ketentuan.
- **404 Not Found** menunjukkan data atau endpoint yang diminta tidak ditemukan.
- **500 Internal Server Error** menandakan adanya kesalahan saat server memproses request.

Dengan status code yang sesuai, client dapat mengetahui apakah request berhasil atau mengalami masalah.

---

## 7. Alasan Penempatan Middleware

Middleware disusun secara berurutan agar setiap request dapat diproses dengan baik.

Logger ditempatkan di awal untuk mencatat request yang masuk. Setelah itu, JSON parser digunakan untuk membaca data JSON yang dikirim client. Selanjutnya, route memproses request berdasarkan URL dan method yang sesuai.

404 handler diletakkan setelah seluruh route agar hanya menangani request yang tidak memiliki tujuan yang cocok. Sementara itu, error handler ditempatkan paling akhir agar dapat menangani kesalahan yang diteruskan dari middleware atau route sebelumnya.

Susunan tersebut membuat proses penanganan request lebih teratur dan mudah dipahami.

---

## 8. Kesimpulan

Berdasarkan praktikum Pertemuan 4, Express.js dapat digunakan untuk menyederhanakan proses routing yang sebelumnya dibuat menggunakan modul `node:http`. Express juga menyediakan middleware untuk membantu mengatur alur request, membaca data JSON, mencatat request, dan menangani kesalahan.

Pengujian menggunakan `curl` membantu memeriksa respons server pada kondisi berhasil maupun ketika terjadi kesalahan. Dengan penggunaan route, middleware, dan status code yang tepat, API menjadi lebih terstruktur dan lebih mudah dikelola.
