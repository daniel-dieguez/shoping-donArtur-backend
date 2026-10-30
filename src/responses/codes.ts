import { Response } from "express";

interface Codigo {
  status: number;
  message: string;
}

export const CODIGOS: Record<number, Codigo> = {
  // Éxito
  1: { status: 200, message: "Operación exitosa" },

  // Errores de base de datos y parámetros
  1001: { status: 500, message: "Error de conexión a la base de datos" },
  1002: { status: 500, message: "Error al ejecutar la consulta" },
  1003: { status: 400, message: "Opción no válida" },
  1004: { status: 400, message: "Parámetros inválidos" },

  // Sin resultados
  2009: { status: 404, message: "No se encontraron registros" },

  // Autenticación
  3001: { status: 401, message: "Credenciales inválidas" },
  4001: { status: 401, message: "Token requerido" },
  4002: { status: 401, message: "Token inválido o expirado" },

  // Consulta sin datos
  7001: { status: 400, message: "La consulta no devolvió resultados" },
};

export const responder = <T>(
  res: Response,
  codigo: number,
  data?: T,
  message?: string, // opcional, para sobrescribir el mensaje del catálogo
): Response => {
  const def = CODIGOS[codigo] ?? { status: 400, message: "Error desconocido" };

  return res.status(def.status).json({
    response: codigo,
    message: message ?? def.message,
    data,
  });
};
