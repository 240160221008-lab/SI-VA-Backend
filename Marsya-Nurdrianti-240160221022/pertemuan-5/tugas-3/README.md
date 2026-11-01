
# Tugas 3 Pertemuan 5 — RESTful API

**Nama:** Marsya Nurdrianti  
**NPM:** 240160221022  
**Mata Kuliah:** SI-VA Backend

## Deskripsi

Project ini merupakan RESTful API yang dibuat menggunakan Express.js 5 dan Node.js. API mengelola dua resource, yaitu anggota dan absensi. Data disimpan sementara dalam array sehingga belum menggunakan database.

## Cara Menjalankan

1. Pastikan Node.js sudah terpasang.
2. Buka terminal pada folder project.
3. Instal dependency:

   ```bash
   npm install
   ```

4. Jalankan server:

   ```bash
   npm start
   ```

5. Server berjalan pada `http://localhost:3006`.

## Endpoint Anggota

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/anggota` | Menampilkan semua anggota |
| GET | `/anggota/:id` | Menampilkan detail anggota |
| POST | `/anggota` | Menambahkan anggota |
| PUT | `/anggota/:id` | Mengganti seluruh data anggota |
| PATCH | `/anggota/:id` | Mengubah sebagian data anggota |
| DELETE | `/anggota/:id` | Menghapus anggota |

### Filter Anggota

Contoh:

`GET /anggota?divisi=Humas&status=Aktif`

Parameter `divisi` dan `status` digunakan untuk memfilter data anggota.

### Contoh POST Anggota

```json
{
  "nama": "Andi Saputra",
  "divisi": "Acara",
  "status": "Aktif"
}
```

## Endpoint Absensi

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/absensi` | Menampilkan semua absensi |
| GET | `/absensi/:id` | Menampilkan detail absensi |
| POST | `/absensi` | Menambahkan absensi |

### Filter Absensi

Contoh:

`GET /absensi?tanggal=2026-10-06&status=Hadir`

Parameter `tanggal` dan `status` digunakan untuk memfilter absensi.

### Contoh POST Absensi

```json
{
  "anggotaId": 1,
  "tanggal": "2026-10-07",
  "status": "Hadir"
}
```

## Status HTTP

| Status | Keterangan |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 204 | Data berhasil dihapus tanpa response body |
| 400 | Data atau input tidak valid |
| 404 | Data atau endpoint tidak ditemukan |
| 500 | Kesalahan server yang tidak terduga |

## Pengujian

Pengujian dilakukan menggunakan Postman atau aplikasi sejenis. Screenshot hasil pengujian disimpan pada folder `screenshots`.

1. GET semua anggota
2. GET detail anggota
3. GET anggota dengan filter
4. POST anggota
5. POST anggota dengan data tidak valid
6. GET anggota dengan ID yang tidak ditemukan
7. PUT anggota
8. PATCH anggota
9. DELETE anggota
10. GET semua absensi
11. POST absensi

## Kesimpulan

RESTful API ini menerapkan operasi CRUD pada resource anggota dan menyediakan pengelolaan data absensi. API juga menerapkan filter, validasi input, format respons JSON yang konsisten, dan penanganan status HTTP.
```

## 5. Cara menjalankan project

Buka terminal VS Code di folder `pertemuan-05`, kemudian jalankan:

```bash
npm install
```

Setelah proses instalasi selesai, jalankan:

```bash
npm start
```

Kalau berhasil, akan muncul:

```text
RESTful API berjalan di http://localhost:3006
```

Kamu bisa menguji endpoint menggunakan Postman. Contohnya, pilih method `GET`, masukkan URL `http://localhost:3006/anggota`, lalu klik **Send**.

## 6. Screenshot yang harus kamu siapkan

Simpan hasil pengujian ke folder `screenshots` dengan nama berikut:

- `01-get-semua-anggota.png`
- `02-get-detail-anggota.png`
- `03-filter-anggota.png`
- `04-post-anggota.png`
- `05-post-validasi-400.png`
- `06-get-not-found-404.png`
- `07-put-anggota.png`
- `08-patch-anggota.png`
- `09-delete-anggota.png`
- `10-get-absensi.png`
- `11-post-absensi.png`

**Penting:** kode ini menyimpan data dalam memori. Jadi, data baru akan kembali seperti semula saat server dimatikan dan dijalankan ulang. Untuk screenshot `DELETE`, pastikan kamu melakukan pengujian setelah server aktif.

Selesaikan dulu pembuatan ketiga file kode dan `README.md`. Setelah itu, jalankan `npm install` dan `npm start`. Jika ada pesan error, kirimkan screenshot terminalnya supaya kita bisa memperbaikinya bersama.