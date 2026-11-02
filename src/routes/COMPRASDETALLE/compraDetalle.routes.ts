import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  store,
  update,
  eliminar,
  all,
  one,
} from "../../controllers/PROD/COMPRASDETALLE/comprasDetalleController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/comprasDetalle/store", verificarToken, store);
router.post("/comprasDetalle/update", verificarToken, update);
router.post("/comprasDetalle/eliminar", verificarToken, eliminar);
router.post("/comprasDetalle/one", verificarToken, one);
router.get("/comprasDetalle/all", verificarToken, all);



export default router;
