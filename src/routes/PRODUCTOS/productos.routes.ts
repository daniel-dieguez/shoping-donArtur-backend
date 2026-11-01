import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/PROD/PRODUCTOS/productosController";

const router = Router();

router.post("/productos/store", verificarToken, store);
router.post("/productos/update", verificarToken, update);
router.post("/productos/estado", verificarToken, estado);
router.post("/productos/one", verificarToken, one);
router.get("/productos/all", verificarToken, all);



export default router;
