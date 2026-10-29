import { Router } from "express";
import { verificarToken, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();

router.get("/perfil", verificarToken, (req: AuthRequest, res) => {
  res.json({ response: 1, message: "Token válido", user: req.user });
});

export default router;
