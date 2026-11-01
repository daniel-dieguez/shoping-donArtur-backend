import express from "express";
import cors from "cors";
import helmet from "helmet";
import loginRoutes from "./routes/login.routes";
import perfilRoutes from "./routes/perfil.routes";
import tipoUsuario from "./routes/TIPOUSUARIO/tipoUsuario.routes"
import productos from "./routes/PRODUCTOS/productos.routes"
import catalogoProductos from "./routes/CATALOGOPRODUCTOS/catalogoProductos.routes"
import catalogoCupones from "./routes/CATALOGOCUPONES/catalogoCupones.routes"
import cupones from "./routes/CUPONES/cupones.routes"
import ubicacion from "./routes/UBICACION/ubicacion.routes"

import roles  from "./routes/ROLES/roles.routes"
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

//roles
app.use("/api", roles);

//productos
app.use("/api", productos);

//catalogo productos
app.use("/api", catalogoProductos);

//catalogo cupones
app.use("/api", catalogoCupones);

//cupones
app.use("/api", cupones);

//ubicaciones 
app.use("/api", ubicacion);




// para cuando no encuentre la api
app.use(notFound)
export default app;
