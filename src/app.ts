import express from "express";
import cors from "cors";
import helmet from "helmet";
import loginRoutes from "./routes/login.routes";
import perfilRoutes from "./routes/perfil.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", loginRoutes);
app.use("/api", perfilRoutes);

export default app;
