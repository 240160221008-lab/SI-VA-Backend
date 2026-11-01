# Tugas 4 – Integrasi Database dan ORM

**Nama:** Marsya Nurdrianti  
**NPM:** 240160221022  
**Mata Kuliah:** Pemrograman Backend

## Deskripsi
Tugas ini merupakan pengembangan REST API dari Tugas 3 dengan mengintegrasikan database SQLite menggunakan Prisma ORM.

## Teknologi
- Node.js
- TypeScript
- Express.js
- Prisma ORM 7.10.1
- SQLite
- Postman

## Struktur Folder
```text
tugas-4/
├── generated/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── screenshots/
├── src/
│   ├── app.ts
│   ├── client.ts
│   └── server.ts
├── .env.example
├── package.json
├── package-lock.json
├── prisma.config.ts
└── tsconfig.json
```

## Fitur API

### Anggota
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /anggota | Menampilkan semua anggota |
| GET | /anggota/:id | Menampilkan detail anggota |
| POST | /anggota | Menambahkan anggota |
| PATCH | /anggota/:id | Mengubah data anggota |
| DELETE | /anggota/:id | Menghapus anggota |

### Absensi
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /absensi | Menampilkan semua absensi |
| GET | /absensi/:id | Menampilkan detail absensi |
| POST | /absensi | Menambahkan absensi |
| PATCH | /absensi/:id | Mengubah data absensi |
| DELETE | /absensi/:id | Menghapus absensi |

## Cara Menjalankan Project

1. Instal seluruh dependency:
   ```bash
   npm install
   ```

2. Buat file `.env` berdasarkan `.env.example`.

3. Jalankan migration:
   ```bash
   npx prisma migrate dev
   ```

4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Jalankan server:
   ```bash
   npm run dev
   ```

6. Akses API melalui:
   ```text
   http://localhost:3008
   ```

## Contoh Request

POST `/anggota`

```json
{
  "nama": "Marsya Nurdrianti",
  "divisi": "Acara",
  "status": "Aktif"
}
```

POST `/absensi`

```json
{
  "anggotaId": 1,
  "tanggal": "2026-11-02",
  "keterangan": "Hadir"
}
```

## Database

Database menggunakan SQLite dengan dua tabel utama, yaitu `Anggota` dan `Absensi`. Hubungan keduanya menggunakan relasi one-to-many.

## Pengujian

Pengujian REST API dilakukan menggunakan Postman, meliputi GET, POST, PATCH, DELETE, serta validasi input.