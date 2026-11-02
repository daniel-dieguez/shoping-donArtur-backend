import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { PagosModel } from "../../../models/PROD/PAGOS/pagosModel";

export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as PagosModel;
  const IDCompra = body.IDCompra;
  const metodoPago = body.metodoPago;
  const monto = body.monto;
  const referencia = body.referencia;
  const comprobante = body.comprobante;
  const observacion = body.observacion;
  const fechaPago = body.fechaPago;

  if (!IDCompra) {
    responder(res, 1004, undefined, "La compra del pago es obligatoria");
    return;
  }
  if (!metodoPago) {
    responder(res, 1004, undefined, "El método de pago es obligatorio");
    return;
  }
  if (!monto || monto <= 0) {
    responder(res, 1004, undefined, "El monto debe ser mayor que cero");
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
      .input("IDCompra", sql.Int, IDCompra)
      .input("metodoPago", sql.VarChar(50), metodoPago)
      .input("monto", sql.Decimal(10, 2), monto)
      .input("referencia", sql.VarChar(100), referencia)
      .input("comprobante", sql.VarChar(500), comprobante)
      .input("observacion", sql.VarChar(300), observacion)
      .input(
        "fechaPago",
        sql.DateTime2,
        fechaPago ? new Date(fechaPago) : undefined,
      )
      .execute("SP_Modulo_Pagos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as PagosModel;
  const id = body.id;
  const metodoPago = body.metodoPago;
  const monto = body.monto;
  const referencia = body.referencia;
  const comprobante = body.comprobante;
  const observacion = body.observacion;
  const fechaPago = body.fechaPago;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
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
      .input("id", sql.Int, id)
      .input("metodoPago", sql.VarChar(50), metodoPago)
      .input("monto", sql.Decimal(10, 2), monto)
      .input("referencia", sql.VarChar(100), referencia)
      .input("comprobante", sql.VarChar(500), comprobante)
      .input("observacion", sql.VarChar(300), observacion)
      .input(
        "fechaPago",
        sql.DateTime2,
        fechaPago ? new Date(fechaPago) : undefined,
      )
      .execute("SP_Modulo_Pagos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as PagosModel;
  const id = body.id;
  const estado = body.estado;
  const observacion = body.observacion;
  const validadoPor = body.validadoPor;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (estado === undefined || estado === null) {
    responder(res, 1004, undefined, "Debes de enviar un estado");
    return;
  }
  if (!validadoPor) {
    responder(res, 1004, undefined, "Debes de enviar quién valida el pago");
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
      .input("id", sql.Int, id)
      .input("estado", sql.Int, estado)
      .input("observacion", sql.VarChar(300), observacion)
      .input("validadoPor", sql.Int, validadoPor)
      .execute("SP_Modulo_Pagos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const all = async (req: Request, res: Response): Promise<void> => {
  // la paginación viene por query:
  // /pagos/all?pagina=1&registrosPorPagina=50&IDCompra=10
  const pagina = Number(req.query.pagina) > 0 ? Number(req.query.pagina) : 1;
  const registrosPorPagina =
    Number(req.query.registrosPorPagina) > 0
      ? Number(req.query.registrosPorPagina)
      : 50;
  // filtro opcional: si no se envía, el SP devuelve los pagos de todas las compras
  const IDCompra =
    Number(req.query.IDCompra) > 0 ? Number(req.query.IDCompra) : undefined;

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
      .input("IDCompra", sql.Int, IDCompra)
      .input("pagina", sql.Int, pagina)
      .input("registrosPorPagina", sql.Int, registrosPorPagina)
      .execute("SP_Modulo_Pagos");

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

export const one = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as PagosModel;
  const id = body.id;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
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
      .input("id", sql.Int, id)
      .execute("SP_Modulo_Pagos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
