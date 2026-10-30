import express from "express";
import cors from "cors";
import helmet from "helmet";
import loginRoutes from "./routes/login.routes";
import perfilRoutes from "./routes/perfil.routes";
import tipoUsuario from "./routes/tipoUsuario/tipoUsuario.routes"
import roles  from "./routes/roles/roles.routes"
import { notFound } from "./middlewares/notFound";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", loginRoutes);
app.use("/api", perfilRoutes);


//---- tipoUusuario
app.use("/api", tipoUsuario);
app.use("/api", roles);



// para cuando no encuentre la api
app.use(notFound)
export default app;
