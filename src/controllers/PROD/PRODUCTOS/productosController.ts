import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { ProductosModel } from "../../../models/PROD/PRODUCTOS/productosModels";

// siempre colocaremos primero el store, update, estado, select -> misma arquitecura que la del sp mayor facilidad
export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as ProductosModel;
  const IDCataProd = body.IDCataProd;
  const nombre = body.nombre?.trim();
  const cantidad = body.cantidad;
  const costo = body.costo;
  const usuario = body.usuario;

  if (!IDCataProd) {
    responder(res, 1004, undefined, "La categoría del producto es obligatoria");
    return;
  }
  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
    return;
  }
  if (nombre.length > 20) {
    responder(
      res,
      1004,
      undefined,
      "El nombre no puede tener más de 20 caracteres",
    );
    return;
  }
  if (cantidad === undefined || cantidad === null) {
    responder(res, 1004, undefined, "La cantidad es obligatoria");
    return;
  }
  if (costo === undefined || costo === null) {
    responder(res, 1004, undefined, "El costo es obligatorio");
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
      .input("IDCataProd", sql.Int, IDCataProd)
      .input("nombre", sql.VarChar(20), nombre)
      .input("cantidad", sql.Decimal(18, 0), cantidad)
      .input("costo", sql.Decimal(18, 0), costo)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Productos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as ProductosModel;
  const id = body.id;
  const IDCataProd = body.IDCataProd;
  const nombre = body.nombre?.trim();
  const cantidad = body.cantidad;
  const costo = body.costo;
  const usuario = body.usuario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (!IDCataProd) {
    responder(res, 1004, undefined, "La categoría del producto es obligatoria");
    return;
  }
  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
    return;
  }
  if (nombre.length > 20) {
    responder(
      res,
      1004,
      undefined,
      "El nombre no puede tener más de 20 caracteres",
    );
    return;
  }
  if (cantidad === undefined || cantidad === null) {
    responder(res, 1004, undefined, "La cantidad es obligatoria");
    return;
  }
  if (costo === undefined || costo === null) {
    responder(res, 1004, undefined, "El costo es obligatorio");
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
      .input("IDCataProd", sql.Int, IDCataProd)
      .input("nombre", sql.VarChar(20), nombre)
      .input("cantidad", sql.Decimal(18, 0), cantidad)
      .input("costo", sql.Decimal(18, 0), costo)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Productos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as ProductosModel;
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
      .execute("SP_Modulo_Productos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

//-------------- aqui lo demas

export const all = async (req: Request, res: Response): Promise<void> => {
  // la paginación viene por query: /productos/all?pagina=1&registrosPorPagina=50
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
      .execute("SP_Modulo_Productos");

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
  const body = (req.body ?? {}) as ProductosModel;
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
      .execute("SP_Modulo_Productos");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
