import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { MetricasModel } from "../../../models/ADM/METRICAS/metricasModel";



const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Devuelve undefined si no viene, null si el formato es inválido, Date si es válida
const parseFecha = (valor: unknown): Date | null | undefined => {
  if (valor === undefined || valor === null || valor === "") return undefined;
  if (typeof valor !== "string" || !FECHA_REGEX.test(valor)) return null;
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
};

const leerFiltros = (req: Request): MetricasModel => {
  const query = req.query as Record<string, string | undefined>;
  return {
    fechaInicio: query.fechaInicio,
    fechaFin: query.fechaFin,
    pagina: Number(query.pagina) > 0 ? Number(query.pagina) : 1,
    registrosPorPagina:
      Number(query.registrosPorPagina) > 0
        ? Number(query.registrosPorPagina)
        : 50,
  };
};


const validarFechas = (
  fechaInicio: Date | null | undefined,
  fechaFin: Date | null | undefined,
): string | null => {
  if (fechaInicio === null)
    return "fechaInicio debe tener el formato YYYY-MM-DD";
  if (fechaFin === null) return "fechaFin debe tener el formato YYYY-MM-DD";
  if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
    return "fechaInicio no puede ser mayor que fechaFin";
  }
  return null;
};

// ---------- 1. Productos más vendidos ----------

export const productosMasVendidos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  
  const { fechaInicio, fechaFin, pagina, registrosPorPagina } =
    leerFiltros(req);
  const inicio = parseFecha(fechaInicio);
  const fin = parseFecha(fechaFin);

  const errorFechas = validarFechas(inicio, fin);
  if (errorFechas) {
    responder(res, 1004, undefined, errorFechas);
    return;
  }

  let pool;

  try {
    pool = await getPool();
  } catch (error) {
    console.error(error);
    responder(res, 1001);
    return;
  }

  try {
    const result = await pool
      .request()
      .input("opcion", sql.Int, 1)
      .input("fechaInicio", sql.Date, inicio)
      .input("fechaFin", sql.Date, fin)
      .input("pagina", sql.Int, pagina)
      .input("registrosPorPagina", sql.Int, registrosPorPagina)
      .execute("SP_Modulo_Dashboard");

    if (result.recordset.length === 0) {
      responder(res, 2009);
      return;
    }

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

// ---------- 2. Ventas por mes ----------

export const ventasPorMes = async (
  req: Request,
  res: Response,
): Promise<void> => {

  const { fechaInicio, fechaFin } = leerFiltros(req);
  const inicio = parseFecha(fechaInicio);
  const fin = parseFecha(fechaFin);

  const errorFechas = validarFechas(inicio, fin);
  if (errorFechas) {
    responder(res, 1004, undefined, errorFechas);
    return;
  }

  let pool;

  try {
    pool = await getPool();
  } catch (error) {
    console.error(error);
    responder(res, 1001);
    return;
  }

  try {
    const result = await pool
      .request()
      .input("opcion", sql.Int, 2)
      .input("fechaInicio", sql.Date, inicio)
      .input("fechaFin", sql.Date, fin)
      .execute("SP_Modulo_Dashboard");

    if (result.recordset.length === 0) {
      responder(res, 2009);
      return;
    }

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

// ---------- 3. Resumen general ----------

export const resumen = async (req: Request, res: Response): Promise<void> => {

  const { fechaInicio, fechaFin } = leerFiltros(req);
  const inicio = parseFecha(fechaInicio);
  const fin = parseFecha(fechaFin);

  const errorFechas = validarFechas(inicio, fin);
  if (errorFechas) {
    responder(res, 1004, undefined, errorFechas);
    return;
  }

  let pool;

  try {
    pool = await getPool();
  } catch (error) {
    console.error(error);
    responder(res, 1001);
    return;
  }

  try {
    const result = await pool
      .request()
      .input("opcion", sql.Int, 3)
      .input("fechaInicio", sql.Date, inicio)
      .input("fechaFin", sql.Date, fin)
      .execute("SP_Modulo_Dashboard");

    // el resumen siempre devuelve una fila (con ceros si no hay datos)
    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

// ---------- 4. Productos con existencia baja ----------

export const existenciaBaja = async (
  req: Request,
  res: Response,
): Promise<void> => {

  const { pagina, registrosPorPagina } = leerFiltros(req);

  let pool;

  try {
    pool = await getPool();
  } catch (error) {
    console.error(error);
    responder(res, 1001);
    return;
  }

  try {
    const result = await pool
      .request()
      .input("opcion", sql.Int, 4)
      .input("pagina", sql.Int, pagina)
      .input("registrosPorPagina", sql.Int, registrosPorPagina)
      .execute("SP_Modulo_Dashboard");

    if (result.recordset.length === 0) {
      responder(res, 2009);
      return;
    }

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

// ---------- 5. Compras por estado de pago ----------

export const comprasPorEstadoPago = async (
  req: Request,
  res: Response,
): Promise<void> => {

  const { fechaInicio, fechaFin } = leerFiltros(req);
  const inicio = parseFecha(fechaInicio);
  const fin = parseFecha(fechaFin);

  const errorFechas = validarFechas(inicio, fin);
  if (errorFechas) {
    responder(res, 1004, undefined, errorFechas);
    return;
  }

  let pool;

  try {
    pool = await getPool();
  } catch (error) {
    console.error(error);
    responder(res, 1001);
    return;
  }

  try {
    const result = await pool
      .request()
      .input("opcion", sql.Int, 5)
      .input("fechaInicio", sql.Date, inicio)
      .input("fechaFin", sql.Date, fin)
      .execute("SP_Modulo_Dashboard");

    if (result.recordset.length === 0) {
      responder(res, 2009);
      return;
    }

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
