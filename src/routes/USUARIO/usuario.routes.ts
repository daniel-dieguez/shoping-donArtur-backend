import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/ADM/USUARIO/usuarioController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/usuarios/store", verificarToken, encriptarPassword, store);
router.post("/usuarios/update", verificarToken, update);
router.post("/usuarios/estado", verificarToken, estado);
router.post("/usuarios/one", verificarToken, one);
router.get("/usuarios/all", verificarToken, all);



export default router;
