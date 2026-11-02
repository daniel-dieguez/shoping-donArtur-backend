import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/PROD/VARIANTES/varianteController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/variantes/store", verificarToken, store);
router.post("/variantes/update", verificarToken, update);
router.post("/variantes/estado", verificarToken, estado);
router.post("/variantes/one", verificarToken, one);
router.get("/variantes/all", verificarToken, all);



export default router;
