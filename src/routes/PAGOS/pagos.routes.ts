import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one,
} from "../../controllers/PROD/PAGOS/pagosController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/pagos/store", verificarToken, store);
router.post("/pagos/update", verificarToken, update);
router.post("/pagos/estado", verificarToken, estado);
router.post("/pagos/one", verificarToken, one);
router.get("/pagos/all", verificarToken, all);



export default router;
