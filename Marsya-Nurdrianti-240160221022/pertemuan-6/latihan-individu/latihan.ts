
import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.use(express.json());

// Format respons berhasil
function sendSuccess(
  res: Response,
  message: string,
  data?: unknown,
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
}

// Format respons gagal
function sendError(
  res: Response,
  message: string,
  statusCode = 400
) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

// Mengecek error data duplikat Prisma
function isUniqueError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

// GET semua pengguna
app.get("/pengguna", async (_req: Request, res: Response) => {
  try {
    const pengguna = await prisma.pengguna.findMany({
      orderBy: {
        nim: "asc",
      },
    });

    return sendSuccess(
      res,
      "Berhasil mengambil semua data pengguna",
      {
        total: pengguna.length,
        data: pengguna,
      }
    );
  } catch (error) {
    console.error(error);
    return sendError(res, "Gagal mengambil data pengguna", 500);
  }
});

// GET pengguna berdasarkan NIM
app.get("/pengguna/:nim", async (req: Request, res: Response) => {
  try {
    const pengguna = await prisma.pengguna.findUnique({
      where: {
        nim: String(String(req.params.nim)),
      },
    });

    if (!pengguna) {
      return sendError(res, "Pengguna tidak ditemukan", 404);
    }

    return sendSuccess(res, "Berhasil mengambil detail pengguna", pengguna);
  } catch (error) {
    console.error(error);
    return sendError(res, "Gagal mengambil detail pengguna", 500);
  }
});

// POST menambahkan pengguna
app.post("/pengguna", async (req: Request, res: Response) => {
  try {
    const { nim, nama, email, role } = req.body;

    if (!nim || !nama || !email) {
      return sendError(res, "NIM, nama, dan email wajib diisi");
    }

    if (
      typeof nim !== "string" ||
      typeof nama !== "string" ||
      typeof email !== "string"
    ) {
      return sendError(res, "Format data tidak valid");
    }

    if (
      typeof role !== "undefined" &&
      typeof role !== "string"
    ) {
      return sendError(res, "Role harus berupa teks");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendError(res, "Format email tidak valid");
    }

    const pengguna = await prisma.pengguna.create({
      data: {
        nim,
        nama,
        email,
        role: role || "mahasiswa",
      },
    });

    return sendSuccess(
      res,
      "Pengguna berhasil ditambahkan",
      pengguna,
      201
    );
  } catch (error) {
    if (isUniqueError(error)) {
      return sendError(res, "NIM atau email sudah digunakan", 409);
    }

    console.error(error);
    return sendError(res, "Gagal menambahkan pengguna", 500);
  }
});

// PATCH mengubah data pengguna
app.patch("/pengguna/:nim", async (req: Request, res: Response) => {
  try {
    const nim = String(req.params.nim);
    const { nama, email, role } = req.body;

    const penggunaLama = await prisma.pengguna.findUnique({
      where: { nim },
    });

    if (!penggunaLama) {
      return sendError(res, "Pengguna tidak ditemukan", 404);
    }

    const data: {
      nama?: string;
      email?: string;
      role?: string;
    } = {};

    if (nama !== undefined) {
      if (typeof nama !== "string" || !nama.trim()) {
        return sendError(res, "Nama tidak valid");
      }
      data.nama = nama;
    }

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        return sendError(res, "Format email tidak valid");
      }
      data.email = email;
    }

    if (role !== undefined) {
      if (typeof role !== "string" || !role.trim()) {
        return sendError(res, "Role tidak valid");
      }
      data.role = role;
    }

    if (Object.keys(data).length === 0) {
      return sendError(res, "Tidak ada data yang diubah");
    }

    const pengguna = await prisma.pengguna.update({
      where: { nim },
      data,
    });

    return sendSuccess(res, "Data pengguna berhasil diperbarui", pengguna);
  } catch (error) {
    if (isUniqueError(error)) {
      return sendError(res, "Email sudah digunakan", 409);
    }

    console.error(error);
    return sendError(res, "Gagal memperbarui data pengguna", 500);
  }
});

// DELETE menghapus pengguna
app.delete("/pengguna/:nim", async (req: Request, res: Response) => {
  try {
    const nim = String(req.params.nim);

    const pengguna = await prisma.pengguna.findUnique({
      where: { nim },
    });

    if (!pengguna) {
      return sendError(res, "Pengguna tidak ditemukan", 404);
    }

    await prisma.pengguna.delete({
      where: { nim },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return sendError(res, "Gagal menghapus pengguna", 500);
  }
});

// Menjalankan server
const PORT = Number(process.env.PORT_LATIHAN ?? 3009);

const server = app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Menutup koneksi ketika server dihentikan
async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
