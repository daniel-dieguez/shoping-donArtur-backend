import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/PROD/CATALOGOPRODUCTOS/catalogoProductosController";

const router = Router();

router.post("/catalogo-productos/store", verificarToken, store);
router.post("/catalogo-productos/update", verificarToken, update);
router.post("/catalogo-productos/estado", verificarToken, estado);
router.post("/catalogo-productos/one", verificarToken, one);
router.get("/catalogo-productos/all", verificarToken, all);



export default router;
