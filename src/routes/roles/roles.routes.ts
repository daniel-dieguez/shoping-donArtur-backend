import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/ADM/ROLES/rolesController";

const router = Router();

router.post("/roles/store", verificarToken, store);
router.post("/roles/update", verificarToken, update);
router.post("/roles/estado", verificarToken, estado);
router.post("/roles/one", verificarToken, one);
router.get("/roles/all", verificarToken, all);



export default router;
