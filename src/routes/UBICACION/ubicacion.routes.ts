import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.middleware";
import { municipios,
    departamentos,
} from "../../controllers/ADM/UBICACION/ubicacionController";

const router = Router();

router.post("/ubicacion/store", verificarToken, departamentos);         
router.post("/ubicacion/update", verificarToken, municipios);



export default router;
