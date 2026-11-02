import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { CompraDetalleModel } from "../../../models/PROD/COMPRASDETALLE/comprasDetalle";

export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CompraDetalleModel;
  const IDCompra = body.IDCompra;
  const IDProducto = body.IDProducto;
  const IDVariante = body.IDVariante;
  const cantidad = body.cantidad;
  const costoUnitario = body.costoUnitario;
  const subtotal = body.subtotal;

  if (!IDCompra) {
    responder(res, 1004, undefined, "La compra del detalle es obligatoria");
    return;
  }
  if (!IDProducto) {
    responder(res, 1004, undefined, "El producto del detalle es obligatorio");
    return;
  }
  if (!cantidad || cantidad <= 0) {
    responder(res, 1004, undefined, "La cantidad debe ser mayor que cero");
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
      .input("IDProducto", sql.Int, IDProducto)
      .input("IDVariante", sql.Int, IDVariante)
      .input("cantidad", sql.Decimal(10, 2), cantidad)
      .input("costoUnitario", sql.Decimal(10, 2), costoUnitario)
      .input("subtotal", sql.Decimal(10, 2), subtotal)
      .execute("SP_Modulo_Detalle_Compra");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CompraDetalleModel;
  const id = body.id;
  const IDProducto = body.IDProducto;
  const IDVariante = body.IDVariante;
  const cantidad = body.cantidad;
  const costoUnitario = body.costoUnitario;
  const subtotal = body.subtotal;

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
      .input("IDProducto", sql.Int, IDProducto)
      .input("IDVariante", sql.Int, IDVariante)
      .input("cantidad", sql.Decimal(10, 2), cantidad)
      .input("costoUnitario", sql.Decimal(10, 2), costoUnitario)
      .input("subtotal", sql.Decimal(10, 2), subtotal)
      .execute("SP_Modulo_Detalle_Compra");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const eliminar = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CompraDetalleModel;
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
      .input("opcion", sql.Int, 3)
      .input("id", sql.Int, id)
      .execute("SP_Modulo_Detalle_Compra");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const all = async (req: Request, res: Response): Promise<void> => {
  // la paginación viene por query:
  // /compra-detalle/all?pagina=1&registrosPorPagina=50&IDCompra=10
  const pagina = Number(req.query.pagina) > 0 ? Number(req.query.pagina) : 1;
  const registrosPorPagina =
    Number(req.query.registrosPorPagina) > 0
      ? Number(req.query.registrosPorPagina)
      : 50;
  // filtro opcional: si no se envía, el SP devuelve los detalles de todas las compras
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
      .execute("SP_Modulo_Detalle_Compra");

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
  const body = (req.body ?? {}) as CompraDetalleModel;
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
      .execute("SP_Modulo_Detalle_Compra");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
