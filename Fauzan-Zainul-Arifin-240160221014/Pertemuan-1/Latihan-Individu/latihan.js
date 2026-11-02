const http = require("node:http");
const PORT = 3001;

const mahasiswa = [
    { nim: "240160221013", nama: "Faishal" },
    { nim: "240160221014", nama: "Fauzan" },
];

function sendJSON(res, statusCode, payload) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload, null, 2));
}

function readBody(req) {
    return new Promise((resolve) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                resolve(null);
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    console.log(`${method} ${url}`);

    // GET /about
    if (method === "GET" && url === "/about") {
        return sendJSON(res, 200, {
            success: true,
            message: "API Pertemuan 1",
            author: "Fauzan",
        });
    }

    // POST /mahasiswa
    if (method === "POST" && url === "/mahasiswa") {
        const body = await readBody(req);

        if (!body || !body.nim || !body.nama) {
            return sendJSON(res, 400, {
                success: false,
                message: "nim dan nama wajib diisi",
            });
        }

        mahasiswa.push({
            nim: body.nim,
            nama: body.nama,
        });

        return sendJSON(res, 201, {
            success: true,
            message: "Mahasiswa berhasil ditambahkan",
            data: mahasiswa[mahasiswa.length - 1],
        });
    }

    // GET /mahasiswa
    if (method === "GET" && url === "/mahasiswa") {
        return sendJSON(res, 200, {
            success: true,
            total: mahasiswa.length,
            data: mahasiswa,
        });
    }

    return sendJSON(res, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
});
});

server.listen(PORT, () => {
    console.log(`Latihan berjalan di http://localhost:${PORT}`);
});