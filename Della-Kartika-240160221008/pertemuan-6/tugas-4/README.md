# Tugas 4 — Integrasi Database dan ORM untuk REST API

## 1. Identitas Mahasiswa

| Keterangan | Detail |
|---|---|
| Nama | Della Kartika |
| NIM | 240160221008 |
| Mata Kuliah | Pemrograman Berbasis Web Back End |
| Pertemuan | 6 |
| Tugas | Tugas 4 — Integrasi Database dan ORM untuk REST API |

---

## 2. Deskripsi Tugas

Tugas ini bertujuan untuk mengintegrasikan database dan ORM (*Object-Relational Mapping*) ke dalam REST API. Aplikasi yang dibuat adalah **Sistem Informasi Absensi Organisasi** untuk mengelola data anggota dan data absensi.

API dikembangkan menggunakan Express.js, TypeScript, Prisma ORM, dan SQLite. Data disimpan dalam database sehingga dapat dikelola secara terstruktur.

Fitur yang tersedia meliputi pengambilan data, penambahan data, pencarian berdasarkan ID, perubahan data, penghapusan data, validasi input, dan penanganan kesalahan.

---

## 3. Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Node.js | Menjalankan aplikasi |
| Express.js | Membuat REST API |
| TypeScript | Menulis kode dengan tipe data |
| Prisma ORM | Menghubungkan aplikasi dengan database |
| SQLite | Menyimpan data anggota dan absensi |
| Postman | Menguji endpoint API |
| Git dan GitHub | Mengelola versi dan mengumpulkan tugas |

---

## 4. Struktur Folder

Struktur folder proyek adalah sebagai berikut.

```text
tugas-4/
├── generated/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── dev.db
├── src/
│   ├── app.ts
│   └── client.ts
├── screenshots/
│   ├── 01-get-absensi.png
│   ├── 02-post-anggota.png
│   ├── 03-get-anggota.png
│   ├── 04-post-absensi.png
│   ├── 05-get-detail-absensi.png
│   ├── 06-patch-absensi.png
│   ├── 07-delete-absensi.png
│   ├── 08-patch-anggota.png
│   ├── 09-delete-anggota.png
│   └── 10-get-anggota-404.png
├── .env
├── .env.example
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

**Keterangan:**

- `src/app.ts`: konfigurasi Express.js dan endpoint REST API.
- `src/client.ts`: konfigurasi koneksi Prisma Client.
- `prisma/schema.prisma`: definisi model dan relasi database.
- `prisma/migrations/`: riwayat migrasi database.
- `prisma/dev.db`: file database SQLite.
- `generated/`: hasil generate Prisma Client.
- `screenshots/`: bukti pengujian API menggunakan Postman.
- `.env`: konfigurasi lingkungan aplikasi.
- `.env.example`: contoh konfigurasi lingkungan.

---

## 5. Cara Menjalankan Aplikasi

### 5.1 Instalasi Dependency

Jalankan perintah berikut dari folder `tugas-4`.

```bash
npm install
```

### 5.2 Konfigurasi Environment

Buat file `.env` dengan isi berikut.

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3010
```

### 5.3 Validasi Schema Prisma

```bash
npx prisma validate
```

Perintah ini digunakan untuk memeriksa validitas schema Prisma.

### 5.4 Migrasi Database

```bash
npx prisma migrate dev
```

Perintah ini digunakan untuk menyelaraskan struktur database dengan schema Prisma.

### 5.5 Generate Prisma Client

```bash
npx prisma generate
```

### 5.6 Menjalankan Server

Jika script `dev` tersedia di `package.json`, jalankan:

```bash
npm run dev
```

Jika berhasil, terminal menampilkan alamat server:

```text
API Absensi berjalan di http://localhost:3010
```

**Base URL API:** `http://localhost:3010`

---

## 6. Daftar Endpoint API

### 6.1 Endpoint Anggota

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/anggota` | Mengambil semua data anggota |
| GET | `/anggota/:id` | Mengambil detail anggota berdasarkan ID |
| POST | `/anggota` | Menambahkan anggota baru |
| PATCH | `/anggota/:id` | Memperbarui data anggota |
| DELETE | `/anggota/:id` | Menghapus data anggota |

### 6.2 Endpoint Absensi

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/absensi` | Mengambil semua data absensi |
| GET | `/absensi/:id` | Mengambil detail absensi berdasarkan ID |
| POST | `/absensi` | Menambahkan data absensi |
| PATCH | `/absensi/:id` | Memperbarui data absensi |
| DELETE | `/absensi/:id` | Menghapus data absensi |

---

## 7. Contoh Request API

Pengujian API dilakukan menggunakan Postman.

### 7.1 Menambahkan Data Anggota

**Method:** `POST`

**URL:** `http://localhost:3010/anggota`

**Body — raw — JSON:**

```json
{
  "nim": "240160221099",
  "nama": "Della Kartika",
  "prodi": "Sistem Informasi"
}
```

NIM harus belum terdaftar di database agar data baru dapat ditambahkan dengan status `201 Created`.

### 7.2 Menambahkan Data Absensi

**Method:** `POST`

**URL:** `http://localhost:3010/absensi`

**Body — raw — JSON:**

```json
{
  "anggotaId": 1,
  "tanggal": "2026-10-23",
  "waktuMasuk": "08:00",
  "status": "Hadir",
  "keterangan": "Hadir tepat waktu"
}
```

Gunakan `anggotaId` yang benar-benar tersedia di database. Sesuaikan tanggal dan ID dengan data hasil pengujian.

### 7.3 Memperbarui Data Absensi

**Method:** `PATCH`

**URL:** `http://localhost:3010/absensi/1`

**Body — raw — JSON:**

```json
{
  "status": "Izin",
  "keterangan": "Izin karena keperluan keluarga"
}
```

Ganti ID `1` dengan ID absensi yang tersedia.

---

## 8. Hasil Pengujian API

Pengujian dilakukan menggunakan Postman. Setiap screenshot disimpan dalam folder `screenshots/` yang berada di dalam folder `tugas-4`.

### 8.1 Pengujian GET Semua Data Absensi

- **Method:** GET
- **Endpoint:** `/absensi`
- **Hasil yang diharapkan:** Data absensi berhasil ditampilkan dengan status `200 OK`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/01-get-absensi.png)

---

### 8.2 Pengujian POST Data Anggota

- **Method:** POST
- **Endpoint:** `/anggota`
- **Hasil yang diharapkan:** Data anggota berhasil ditambahkan dengan status `201 Created`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/02-post-anggota.png)

---

### 8.3 Pengujian GET Semua Data Anggota

- **Method:** GET
- **Endpoint:** `/anggota`
- **Hasil yang diharapkan:** Daftar anggota berhasil ditampilkan dengan status `200 OK`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/03-get-anggota.png)

---

### 8.4 Pengujian POST Data Absensi

- **Method:** POST
- **Endpoint:** `/absensi`
- **Hasil yang diharapkan:** Data absensi berhasil disimpan dengan status `201 Created`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/04-post-absensi.png)

---

### 8.5 Pengujian GET Detail Absensi

- **Method:** GET
- **Endpoint:** `/absensi/:id`
- **Hasil yang diharapkan:** Detail absensi berhasil ditampilkan dengan status `200 OK`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/05-get-detail-absensi.png)

---

### 8.6 Pengujian PATCH Data Absensi

- **Method:** PATCH
- **Endpoint:** `/absensi/:id`
- **Hasil yang diharapkan:** Data absensi berhasil diperbarui dengan status `200 OK`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/06-patch-absensi.png)

---

### 8.7 Pengujian DELETE Data Absensi

- **Method:** DELETE
- **Endpoint:** `/absensi/:id`
- **Hasil yang diharapkan:** Data absensi berhasil dihapus dengan status `204 No Content`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/07-delete-absensi.png)

---

### 8.8 Pengujian PATCH Data Anggota

- **Method:** PATCH
- **Endpoint:** `/anggota/:id`
- **Hasil yang diharapkan:** Data anggota berhasil diperbarui dengan status `200 OK`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/08-patch-anggota.png)

---

### 8.9 Pengujian DELETE Data Anggota

- **Method:** DELETE
- **Endpoint:** `/anggota/:id`
- **Hasil yang diharapkan:** Data anggota berhasil dihapus dengan status `204 No Content`.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/09-delete-anggota.png)

---

### 8.10 Pengujian Data Anggota Tidak Ditemukan

- **Method:** GET
- **Endpoint:** `/anggota/99999`
- **Hasil yang diharapkan:** API memberikan status `404 Not Found` karena data anggota tidak ditemukan.

**Screenshot:** [📷 Lihat Hasil Pengujian](screenshots/10-get-anggota-404.png)

---

## 9. Ringkasan Pengujian

| No. | Pengujian | Status yang Diharapkan |
|---|---|---|
| 1 | GET semua absensi | 200 OK |
| 2 | POST anggota | 201 Created |
| 3 | GET semua anggota | 200 OK |
| 4 | POST absensi | 201 Created |
| 5 | GET detail absensi | 200 OK |
| 6 | PATCH absensi | 200 OK |
| 7 | DELETE absensi | 204 No Content |
| 8 | PATCH anggota | 200 OK |
| 9 | DELETE anggota | 204 No Content |
| 10 | GET anggota tidak ditemukan | 404 Not Found |

Status tersebut merupakan hasil yang diharapkan. Sesuaikan laporan dengan hasil pengujian yang benar-benar muncul di Postman.

---

## 10. Status Code yang Digunakan

| Status Code | Keterangan |
|---|---|
| `200 OK` | Request berhasil diproses |
| `201 Created` | Data baru berhasil dibuat |
| `204 No Content` | Data berhasil dihapus tanpa response body |
| `400 Bad Request` | Input tidak valid atau request tidak memenuhi ketentuan |
| `404 Not Found` | Data yang dicari tidak ditemukan |
| `500 Internal Server Error` | Terjadi kesalahan pada server |

---

## 11. Kesimpulan

REST API Sistem Informasi Absensi Organisasi dikembangkan menggunakan Express.js, TypeScript, Prisma ORM, dan SQLite. API menyediakan fitur pengelolaan data anggota dan absensi melalui operasi GET, POST, PATCH, dan DELETE.

Integrasi Prisma ORM memungkinkan aplikasi mengakses database secara terstruktur. Pengujian menggunakan Postman dilakukan untuk memeriksa fungsi endpoint, validasi data, serta status response.

Bukti pengujian disimpan di folder `screenshots/` dan ditautkan pada setiap bagian hasil pengujian di README.

---

