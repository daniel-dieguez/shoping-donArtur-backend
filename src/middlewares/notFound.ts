import { Request, Response } from "express";

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    response: 0,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
};
