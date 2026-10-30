import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update
} from "../../controllers/ADM/rolesController";

const router = Router();

router.post("/roles/store", verificarToken, store);
router.post("/roles/update", verificarToken, update);



export default router;
