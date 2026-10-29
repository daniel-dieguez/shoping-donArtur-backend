import "dotenv/config";
import app from "./app";
import { getPool } from "./config/db";

const PORT = process.env.PORT || 3000;

async function start() {
  await getPool();
  console.log("Conectado a SQL Server");
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("Error al iniciar:", err);
  process.exit(1);
});
