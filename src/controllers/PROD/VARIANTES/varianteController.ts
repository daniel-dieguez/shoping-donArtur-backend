import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { VariantesModel } from "../../../models/PROD/VARIANTES/variantesModels";


export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as VariantesModel;
  const IDProducto = body.IDProducto;
  const SKU = body.SKU?.trim();
  const precio = body.precio;
  const costo = body.costo;
  const usuario = body.usuario;

  if (!IDProducto) {
    responder(res, 1004, undefined, "El producto es obligatorio");
    return;
  }
  if (!SKU) {
    responder(res, 1004, undefined, "El SKU es obligatorio");
    return;
  }
  if (SKU.length > 50) {
    responder(
      res,
      1004,
      undefined,
      "El SKU no puede tener más de 50 caracteres",
    );
    return;
  }
  if (precio === undefined || precio === null) {
    responder(res, 1004, undefined, "El precio es obligatorio");
    return;
  }
  if (precio < 0) {
    responder(res, 1004, undefined, "El precio no puede ser negativo");
    return;
  }
  if (costo === undefined || costo === null) {
    responder(res, 1004, undefined, "El costo es obligatorio");
    return;
  }
  if (costo < 0) {
    responder(res, 1004, undefined, "El costo no puede ser negativo");
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
      .input("IDProducto", sql.Int, IDProducto)
      .input("SKU", sql.VarChar(50), SKU)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("costo", sql.Decimal(10, 2), costo)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Variantes");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as VariantesModel;
  const id = body.id;
  // en el SP el update usa COALESCE: lo que no se envíe conserva su valor actual
  const IDProducto = body.IDProducto;
  const SKU = body.SKU?.trim() || undefined;
  const precio = body.precio;
  const costo = body.costo;
  const usuario = body.usuario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (
    !IDProducto &&
    SKU === undefined &&
    (precio === undefined || precio === null) &&
    (costo === undefined || costo === null)
  ) {
    responder(
      res,
      1004,
      undefined,
      "Debes de enviar al menos un campo a actualizar",
    );
    return;
  }
  if (SKU && SKU.length > 50) {
    responder(
      res,
      1004,
      undefined,
      "El SKU no puede tener más de 50 caracteres",
    );
    return;
  }
  if (precio !== undefined && precio !== null && precio < 0) {
    responder(res, 1004, undefined, "El precio no puede ser negativo");
    return;
  }
  if (costo !== undefined && costo !== null && costo < 0) {
    responder(res, 1004, undefined, "El costo no puede ser negativo");
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
      .input("IDProducto", sql.Int, IDProducto ?? null)
      .input("SKU", sql.VarChar(50), SKU ?? null)
      .input("precio", sql.Decimal(10, 2), precio ?? null)
      .input("costo", sql.Decimal(10, 2), costo ?? null)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Variantes");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as VariantesModel;
  const estado = body.estado;
  const id = body.id;
  const usuario = body.usuario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (estado === undefined || estado === null) {
    responder(res, 1004, undefined, "Debes de enviar un estado");
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
      .input("estado", sql.Int, estado)
      .input("id", sql.Int, id)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Variantes");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

//-------------- aqui lo demas

export const all = async (req: Request, res: Response): Promise<void> => {
  // la paginación viene por query: /variantes/all?pagina=1&registrosPorPagina=50
  const pagina = Number(req.query.pagina) > 0 ? Number(req.query.pagina) : 1;
  const registrosPorPagina =
    Number(req.query.registrosPorPagina) > 0
      ? Number(req.query.registrosPorPagina)
      : 50;

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
      .execute("SP_Modulo_Variantes");

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
  const body = (req.body ?? {}) as VariantesModel;
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
      .execute("SP_Modulo_Variantes");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
