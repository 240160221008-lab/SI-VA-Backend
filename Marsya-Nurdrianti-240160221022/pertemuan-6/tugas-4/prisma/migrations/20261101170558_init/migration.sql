-- CreateTable
CREATE TABLE "anggota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "divisi" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "absensi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anggotaId" INTEGER NOT NULL,
    "tanggal" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    CONSTRAINT "absensi_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "anggota" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
