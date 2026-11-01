import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { CatalogoCuponesModel } from "../../../models/PROD/CATALOGOCUPONES/catalogoCuponesModel";

// siempre colocaremos primero el store, update, estado, select -> misma arquitecura que la del sp mayor facilidad
export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CatalogoCuponesModel;
  const nombre = body.nombre?.trim();
  const porcentaje = body.porcentaje;
  const usuario = body.usuario;

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
  if (porcentaje === undefined || porcentaje === null) {
    responder(res, 1004, undefined, "El porcentaje es obligatorio");
    return;
  }
  if (porcentaje < 0 || porcentaje > 100) {
    responder(res, 1004, undefined, "El porcentaje debe estar entre 0 y 100");
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
      .input("nombre", sql.VarChar(20), nombre)
      .input("porcentaje", sql.Decimal(18, 0), porcentaje)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Catalogo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CatalogoCuponesModel;
  const id = body.id;
  const nombre = body.nombre?.trim() || undefined;
  const porcentaje = body.porcentaje;
  const usuario = body.usuario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (
    nombre === undefined &&
    (porcentaje === undefined || porcentaje === null)
  ) {
    responder(
      res,
      1004,
      undefined,
      "Debes de enviar el nombre o el porcentaje a actualizar",
    );
    return;
  }
  if (nombre && nombre.length > 20) {
    responder(
      res,
      1004,
      undefined,
      "El nombre no puede tener más de 20 caracteres",
    );
    return;
  }
  if (
    porcentaje !== undefined &&
    porcentaje !== null &&
    (porcentaje < 0 || porcentaje > 100)
  ) {
    responder(res, 1004, undefined, "El porcentaje debe estar entre 0 y 100");
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
      .input("nombre", sql.VarChar(20), nombre ?? null)
      .input("porcentaje", sql.Decimal(18, 0), porcentaje ?? null)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Catalogo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CatalogoCuponesModel;
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
      .execute("SP_Modulo_Catalogo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

//-------------- aqui lo demas

export const all = async (req: Request, res: Response): Promise<void> => {

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
      .execute("SP_Modulo_Catalogo_Cupones");

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
  const body = (req.body ?? {}) as CatalogoCuponesModel;
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
      .execute("SP_Modulo_Catalogo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
