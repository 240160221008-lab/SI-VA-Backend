# TUGAS 1 — ANALISIS & DESAIN API

## Sistem Informasi Absensi Organisasi

**Nama:** Rissa Srihandita
**NPM:** 240160221041  
**Kelas:** SI-5A

## 1. Deskripsi Sistem

Sistem Informasi Absensi Organisasi merupakan sistem yang digunakan oleh anggota dan pengurus organisasi untuk mengelola serta mencatat kehadiran pada kegiatan organisasi. Pengguna sistem terdiri dari **admin/pengurus** dan **anggota**. Admin dapat mengelola data anggota dan data absensi, sedangkan anggota dapat melakukan absensi. Sistem menggunakan **Back End REST API** untuk menerima request dari client, memproses data, menyimpan atau mengambil data dari database, kemudian mengirimkan response kembali kepada client dalam format JSON.

## 2. Diagram Arsitektur

Alur sistem:

**Client → HTTP Request → Back End → Database → HTTP Response → Client**

### Penjelasan Alur

1. **Client** berupa aplikasi Web/Mobile mengirimkan HTTP Request.
2. **Back End REST API** menerima request dan memproses permintaan.
3. Back End mengirimkan **Query** kepada database.
4. **Database MySQL** menyimpan atau mengambil data.
5. Database mengembalikan **Data** kepada Back End.
6. Back End memproses data dan mengirimkan **HTTP Response**.
7. Client menerima response dan menampilkan hasil kepada pengguna.

## 3. Resource Sistem

Sistem menggunakan dua resource utama.

### 3.1 Resource Anggota

Resource `anggota` digunakan untuk menyimpan data anggota organisasi.

Atribut:
- `id_anggota`
- `nama`
- `divisi`

### 3.2 Resource Absensi

Resource `absensi` digunakan untuk menyimpan data kehadiran anggota.

Atribut:
- `id_absensi`
- `id_anggota`
- `tanggal`
- `status`

Status kehadiran:
- `Hadir`
- `Izin`
- `Sakit`
- `Alpa`

## 4. Tabel Resource dan Endpoint

Terdapat **8 endpoint**, yaitu 4 endpoint untuk resource `anggota` dan 4 endpoint untuk resource `absensi`.

| No | Resource | Operasi | Method | Endpoint | Request Body | Response Body | Sukses | Gagal |
|---|---|---|---|---|---|---|---|---|
| 1 | Anggota | Menampilkan semua anggota | GET | `/api/anggota` | - | Array data anggota | 200 | 500 |
| 2 | Anggota | Menampilkan anggota berdasarkan ID | GET | `/api/anggota/:id` | - | Data anggota | 200 | 404 |
| 3 | Anggota | Menambahkan anggota | POST | `/api/anggota` | Data anggota | Data anggota baru | 201 | 400 |
| 4 | Anggota | Menghapus anggota | DELETE | `/api/anggota/:id` | - | Pesan berhasil | 200 | 404 |
| 5 | Absensi | Menampilkan semua absensi | GET | `/api/absensi` | - | Array data absensi | 200 | 500 |
| 6 | Absensi | Menampilkan absensi berdasarkan ID | GET | `/api/absensi/:id` | - | Data absensi | 200 | 404 |
| 7 | Absensi | Menambahkan absensi | POST | `/api/absensi` | Data absensi | Data absensi baru | 201 | 400 |
| 8 | Absensi | Menghapus absensi | DELETE | `/api/absensi/:id` | - | Pesan berhasil | 200 | 404 |

### Keterangan Status Code

| Status Code | Keterangan |
|---|---|
| **200 OK** | Request berhasil diproses |
| **201 Created** | Data berhasil dibuat |
| **400 Bad Request** | Data yang dikirim tidak valid |
| **404 Not Found** | Data yang dicari tidak ditemukan |
| **500 Internal Server Error** | Terjadi kesalahan pada server |

## 5. Contoh JSON

### 5.1 Resource Anggota

**Request Body — POST `/api/anggota`**

```json
{
  "nama": "Rissa Srihandita",
  "divisi": "Humas"
}
```

**Response Body**

```json
{
  "status": "success",
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id_anggota": 1,
    "nama": "Rissa Srihandita",
    "divisi": "Humas"
  }
}
```

**Status Code:** `201 Created`

### 5.2 Resource Absensi

**Request Body — POST `/api/absensi`**

```json
{
  "id_anggota": 1,
  "tanggal": "2026-09-27",
  "status": "Hadir"
}
```

**Response Body**

```json
{
  "status": "success",
  "message": "Absensi berhasil dicatat",
  "data": {
    "id_absensi": 1,
    "id_anggota": 1,
    "tanggal": "2026-09-27",
    "status": "Hadir"
  }
}
```

**Status Code:** `201 Created`

## 6. Skenario Uji

### Skenario 1 — Berhasil Menambahkan Anggota

**Request**

```http
POST /api/anggota
Content-Type: application/json
```

```json
{
  "nama": "Rissa Srihandita",
  "divisi": "Humas"
}
```

**Response — 201 Created**

```json
{
  "status": "success",
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id_anggota": 1,
    "nama": "Rissa Srihandita",
    "divisi": "Humas"
  }
}
```

**Penjelasan:** Client mengirim data anggota kepada Back End. Back End memproses data dan menyimpannya ke database. Setelah berhasil, server mengirimkan response bahwa anggota berhasil ditambahkan.

### Skenario 2 — Berhasil Mencatat Absensi

**Request**

```http
POST /api/absensi
Content-Type: application/json
```

```json
{
  "id_anggota": 1,
  "tanggal": "2026-09-27",
  "status": "Hadir"
}
```

**Response — 201 Created**

```json
{
  "status": "success",
  "message": "Absensi berhasil dicatat",
  "data": {
    "id_absensi": 1,
    "id_anggota": 1,
    "tanggal": "2026-09-27",
    "status": "Hadir"
  }
}
```

**Penjelasan:** Client mengirim data kehadiran anggota. Back End menyimpan data tersebut ke database dan mengirimkan response bahwa absensi berhasil dicatat.

### Skenario 3 — Gagal Karena Data Tidak Ditemukan

Misalnya client ingin mencari anggota dengan ID `99`, tetapi anggota tersebut tidak tersedia di database.

**Request**

```http
GET /api/anggota/99
```

**Response — 404 Not Found**

```json
{
  "status": "error",
  "message": "Anggota dengan ID 99 tidak ditemukan"
}
```

**Penjelasan:** Client meminta data anggota dengan ID 99. Back End mencari data tersebut di database, tetapi data tidak ditemukan sehingga server mengembalikan status **404 Not Found**.
