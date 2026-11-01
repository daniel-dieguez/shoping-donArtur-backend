import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  estado,
  all,
  one
} from "../../controllers/PROD/CATALOGOCUPONES/catalogoCuponesController";

const router = Router();

router.post("/catalogo-cupones/store", verificarToken, store);
router.post("/catalogo-cupones/update", verificarToken, update);
router.post("/catalogo-cupones/estado", verificarToken, estado);
router.post("/catalogo-cupones/one", verificarToken, one);
router.get("/catalogo-cupones/all", verificarToken, all);



export default router;
