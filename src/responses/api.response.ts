import { Response } from "express";

export const ok = <T>(res: Response, message = "OK", data?: T): Response =>
  res.status(200).json({ response: 1, message, data });

export const created = <T>(
  res: Response,
  message = "Creado con exito",
  data?: T,
): Response => res.status(201).json({ response: 1, message, data });

// 400 personalizable: mensaje propio y lista opcional de errores por campo
export const badRequest = (
  res: Response,
  message = "Solicitud incorrecta en la base de datos",
  errors?: Record<string, string> | string[],
): Response => res.status(400).json({ response: 0, message, errors });

export const unauthorized = (
  res: Response,
  message = "No autorizado",
): Response => res.status(401).json({ response: 0, message });

export const forbidden = (
  res: Response,
  message = "Acceso denegado",
): Response => res.status(403).json({ response: 0, message });

export const notFound = (res: Response, message = "Ruta no encontrada"): Response =>
  res.status(404).json({ response: 0, message });

export const serverError = (
  res: Response,
  message = "Error interno del servidor",
  messageUser = "Error al realizar la acción, soporte le brindara apoyo",
): Response => res.status(500).json({ response: 0, message });


