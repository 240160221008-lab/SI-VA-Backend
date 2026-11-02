
import "dotenv/config";
import app from "./app.js";
import { prisma } from "./client.js";

const PORT = Number(process.env.PORT) || 3008;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
