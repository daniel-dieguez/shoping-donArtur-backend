import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: number;
  roles: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ response: 0, message: "Token requerido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    next();
  } catch {
    res.status(401).json({ response: 0, message: "Token inválido o expirado" });
  }
};
