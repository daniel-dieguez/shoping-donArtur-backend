import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one,
} from "../../controllers/PROD/CARRITO/carritoController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/carrito/store", verificarToken, store);
router.post("/carrito/update", verificarToken, update);
router.post("/carrito/estado", verificarToken, estado);
router.post("/carrito/one", verificarToken, one);
router.get("/carrito/all", verificarToken, all);



export default router;
