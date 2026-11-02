import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { CarritoDetalleModel } from "../../../models/PROD/CARRITODETALLE/carritoDetalleModel";

const SP_BUSINESS_ERRORS = [50101, 50102, 50103, 50104];

export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CarritoDetalleModel;
  const IDCarrito = body.IDCarrito;
  const IDVariante = body.IDVariante;
  const cantidad = body.cantidad;
  const precioUnitario = body.precioUnitario;

  if (!IDCarrito) {
    responder(res, 1004, undefined, "El carrito es obligatorio");
    return;
  }
  if (!IDVariante) {
    responder(res, 1004, undefined, "La variante es obligatoria");
    return;
  }
  if (cantidad === undefined || cantidad === null) {
    responder(res, 1004, undefined, "La cantidad es obligatoria");
    return;
  }
  if (cantidad <= 0) {
    responder(res, 1004, undefined, "La cantidad debe ser mayor que cero");
    return;
  }
  if (
    precioUnitario !== undefined &&
    precioUnitario !== null &&
    precioUnitario < 0
  ) {
    responder(res, 1004, undefined, "El precio unitario no puede ser negativo");
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
      .input("IDCarrito", sql.Int, IDCarrito)
      .input("IDVariante", sql.Int, IDVariante)
      .input("cantidad", sql.Decimal(10, 2), cantidad)
      .input("precioUnitario", sql.Decimal(10, 2), precioUnitario ?? null)
      .execute("SP_Modulo_Detalle_Carrito");

    responder(res, 1, result.recordset);
  } catch (error) {
    const sqlError = error as { number?: number; message?: string };

    if (sqlError.number && SP_BUSINESS_ERRORS.includes(sqlError.number)) {
      responder(res, 1004, undefined, sqlError.message);
      return;
    }

    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CarritoDetalleModel;
  const id = body.id;
  const cantidad = body.cantidad;
  const precioUnitario = body.precioUnitario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (cantidad === undefined || cantidad === null) {
    responder(res, 1004, undefined, "La cantidad es obligatoria");
    return;
  }
  if (cantidad <= 0) {
    responder(res, 1004, undefined, "La cantidad debe ser mayor que cero");
    return;
  }
  if (
    precioUnitario !== undefined &&
    precioUnitario !== null &&
    precioUnitario < 0
  ) {
    responder(res, 1004, undefined, "El precio unitario no puede ser negativo");
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
      .input("cantidad", sql.Decimal(10, 2), cantidad)
      .input("precioUnitario", sql.Decimal(10, 2), precioUnitario ?? null)
      .execute("SP_Modulo_Detalle_Carrito");

    responder(res, 1, result.recordset);
  } catch (error) {
    const sqlError = error as { number?: number; message?: string };

    if (sqlError.number && SP_BUSINESS_ERRORS.includes(sqlError.number)) {
      responder(res, 1004, undefined, sqlError.message);
      return;
    }

    console.error(error);
    responder(res, 1002);
  }
};

export const eliminar = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CarritoDetalleModel;
  const id = Number(body.id ?? req.query.id);

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
      .execute("SP_Modulo_Detalle_Carrito");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const all = async (req: Request, res: Response): Promise<void> => {
  const pagina = Number(req.query.pagina) > 0 ? Number(req.query.pagina) : 1;
  const registrosPorPagina =
    Number(req.query.registrosPorPagina) > 0
      ? Number(req.query.registrosPorPagina)
      : 50;
  const IDCarrito =
    Number(req.query.IDCarrito) > 0 ? Number(req.query.IDCarrito) : null;

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
      .input("IDCarrito", sql.Int, IDCarrito)
      .input("pagina", sql.Int, pagina)
      .input("registrosPorPagina", sql.Int, registrosPorPagina)
      .execute("SP_Modulo_Detalle_Carrito");

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
  const body = (req.body ?? {}) as CarritoDetalleModel;
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
      .execute("SP_Modulo_Detalle_Carrito");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
