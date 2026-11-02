import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one,
} from "../../controllers/PROD/COMPRAS/comprasController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/compras/store", verificarToken, store);
router.post("/compras/update", verificarToken, update);
router.post("/compras/estado", verificarToken, estado);
router.post("/compras/one", verificarToken, one);
router.get("/compras/all", verificarToken, all);



export default router;
