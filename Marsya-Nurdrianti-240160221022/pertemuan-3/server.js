import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";

import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

// Function untuk membaca file JSON
const bacaJSON = async (namaFile) => {
  try {
    const lokasiFile = path.join(import.meta.dirname, "data", namaFile);
    const isiFile = await readFile(lokasiFile, "utf8");

    return JSON.parse(isiFile);
  } catch (error) {
    console.error("File gagal dibaca:", error.message);
    return null;
  }
};

// Helper untuk mengirim response JSON
const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE,
      endpoints: [
        "GET /",
        "GET /health",
        "GET /students",
      ],
    });
  }

  // GET /health
  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      courseCode: COURSE_CODE,
      node: process.version,
    });
  }

  // GET /students
  if (method === "GET" && url === "/students") {
    const students = await bacaJSON("students.json");

    if (!students) {
      return sendJSON(response, 500, {
        success: false,
        message: "Data mahasiswa gagal dibaca",
      });
    }

    return sendJSON(response, 200, {
      success: true,
      courseCode: COURSE_CODE,
      data: students,
    });
  }

  // Endpoint tidak ditemukan
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Course Code: ${COURSE_CODE}`);
});