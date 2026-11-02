import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  ajustar,
  disponibilidad,
  all,
  one,
} from "../../controllers/PROD/INVENTARIO/inventarioController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/inventario/store", verificarToken, store);
router.post("/inventario/ajustar", verificarToken, ajustar);
router.post("/inventario/disponibilidad", verificarToken, disponibilidad);
router.post("/inventario/one", verificarToken, one);
router.get("/inventario/all", verificarToken, all);



export default router;
