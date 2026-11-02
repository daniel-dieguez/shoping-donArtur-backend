import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import {
  productosMasVendidos,
  ventasPorMes,
  resumen,
  existenciaBaja,
  comprasPorEstadoPago,
} from "../../controllers/ADM/METRICAS/metricasController";
import { encriptarPassword } from "../../responses/encriptarPassword";

const router = Router();

router.post("/metricas/productosMasVendidos", verificarToken, productosMasVendidos);
router.post("/metricas/ventasPorMes", verificarToken, ventasPorMes);
router.post("/metricas/resumen", verificarToken, resumen);
router.post("/metricas/existenciaBaja", verificarToken, existenciaBaja);
router.get("/metricas/comprasPorEstadoPago", verificarToken, comprasPorEstadoPago);



export default router;
