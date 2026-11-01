import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/PROD/CUPONES/cuponesController";

const router = Router();

router.post("/cupones/store", verificarToken, store);
router.post("/cupones/update", verificarToken, update);
router.post("/cupones/estado", verificarToken, estado);
router.post("/cupones/one", verificarToken, one);
router.get("/cupones/all", verificarToken, all);



export default router;
