import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  tipoUsuarioAll,
  tipoUsuarioOne,
  obtenerTipoUsuario,
  store,
  update
} from "../../controllers/ADM/TIPOUSUARIO/tipoUsuarioController";

const router = Router();

router.post("/tipo-usuario/store", verificarToken, store);
router.post("/tipo-usuario/updatesss", verificarToken, update);
router.post("/tipo-usuario/all", verificarToken, tipoUsuarioAll);
router.post("/tipo-usuario/one", verificarToken, tipoUsuarioOne);
router.get("/tipo-usuario/tipo", verificarToken, obtenerTipoUsuario);


export default router;
