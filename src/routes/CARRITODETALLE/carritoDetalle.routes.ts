import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  eliminar,
  all,
  one,
} from "../../controllers/PROD/CARRITODETALLE/carritoDetalleController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/carrito/store", verificarToken, store);
router.post("/carrito/update", verificarToken, update);
router.post("/carrito/estado", verificarToken, eliminar);
router.post("/carrito/one", verificarToken, one);
router.get("/carrito/all", verificarToken, all);



export default router;
