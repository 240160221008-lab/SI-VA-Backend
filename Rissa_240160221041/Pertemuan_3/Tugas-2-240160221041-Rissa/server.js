/**
 * server.js
 * HTTP Server Sederhana tanpa Express.js
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, NODE_ENV, COURSE_CODE } from "./config.js";

// Helper 1: Mengirim JSON response secara terstruktur
const sendJSON = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload, null, 2));
};

// Helper 2: Pembacaan file asynchronous dengan try/catch
async function bacaDataAbsensi() {
  try {
    const filePath = path.join(import.meta.dirname, "data", "absensi.json");
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("[Error File System]:", error.message);
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Endpoint 1: GET /
  if (method === "GET" && url === "/") {
    return sendJSON(res, 200, {
      success: true,
      appName: APP_NAME,
      courseCode: COURSE_CODE,
      environment: NODE_ENV,
      endpoints: ["GET /", "GET /health", "GET /absensi"],
    });
  }

  // Endpoint 2: GET /health
  if (method === "GET" && url === "/health") {
    return sendJSON(res, 200, {
      success: true,
      status: "UP",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  // Endpoint 3: GET /absensi (Membaca file JSON secara asynchronous)
  if (method === "GET" && url === "/absensi") {
    const data = await bacaDataAbsensi();
    if (!data) {
      return sendJSON(res, 500, {
        success: false,
        message: "Gagal membaca data absensi dari berkas",
      });
    }

    return sendJSON(res, 200, {
      success: true,
      total: data.length,
      data: data,
    });
  }

  // Penanganan Response 404 (Endpoint tidak ditemukan)
  return sendJSON(res, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan pada http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV} | Course Code: ${COURSE_CODE}`);
});