import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { InventarioModel } from "../../../models/PROD/INVENTARIO/inventarioModel";


const SP_BUSINESS_ERRORS = [50001, 50002, 50003];


const USUARIO_NUMERICO = /^\d+$/;


export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as InventarioModel;
  const IDVariante = body.IDVariante;
  const existenciaFisica = body.existenciaFisica; 
  const motivo = body.motivo?.trim() || undefined; 
  const usuario = body.usuario;

  if (!IDVariante) {
    responder(res, 1004, undefined, "La variante es obligatoria");
    return;
  }
  if (
    existenciaFisica !== undefined &&
    existenciaFisica !== null &&
    existenciaFisica < 0
  ) {
    responder(
      res,
      1004,
      undefined,
      "La existencia física no puede ser negativa",
    );
    return;
  }
  if (motivo && motivo.length > 300) {
    responder(
      res,
      1004,
      undefined,
      "El motivo no puede tener más de 300 caracteres",
    );
    return;
  }
  if (usuario && !USUARIO_NUMERICO.test(String(usuario))) {
    responder(
      res,
      1004,
      undefined,
      "El usuario debe ser el id numérico del usuario",
    );
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
      .input("IDVariante", sql.Int, IDVariante)
      .input("existenciaFisica", sql.Decimal(10, 2), existenciaFisica ?? null)
      .input("motivo", sql.VarChar(300), motivo ?? null)
      .input(
        "usuario",
        sql.VarChar(50),
        usuario !== undefined ? String(usuario) : null,
      )
      .execute("SP_Modulo_Inventario");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const ajustar = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as InventarioModel;
  const IDVariante = body.IDVariante;
  const existenciaFisica = body.existenciaFisica;
  const motivo = body.motivo?.trim();
  const usuario = body.usuario;

  if (!IDVariante) {
    responder(res, 1004, undefined, "La variante es obligatoria");
    return;
  }
  if (existenciaFisica === undefined || existenciaFisica === null) {
    responder(res, 1004, undefined, "La existencia física es obligatoria");
    return;
  }
  if (existenciaFisica < 0) {
    responder(
      res,
      1004,
      undefined,
      "La existencia física no puede ser negativa",
    );
    return;
  }
  if (!motivo) {
    responder(res, 1004, undefined, "El motivo del ajuste es obligatorio");
    return;
  }
  if (motivo.length > 300) {
    responder(
      res,
      1004,
      undefined,
      "El motivo no puede tener más de 300 caracteres",
    );
    return;
  }
  if (usuario && !USUARIO_NUMERICO.test(String(usuario))) {
    responder(
      res,
      1004,
      undefined,
      "El usuario debe ser el id numérico del usuario",
    );
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
      .input("IDVariante", sql.Int, IDVariante)
      .input("existenciaFisica", sql.Decimal(10, 2), existenciaFisica)
      .input("motivo", sql.VarChar(300), motivo)
      .input(
        "usuario",
        sql.VarChar(50),
        usuario !== undefined ? String(usuario) : null,
      )
      .execute("SP_Modulo_Inventario");

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

//-------------- aqui lo demas


export const disponibilidad = async (
  req: Request,
  res: Response,
): Promise<void> => {
 
  const IDVariante = Number(
    req.query.IDVariante ??
      (req.body as InventarioModel | undefined)?.IDVariante,
  );

  if (!IDVariante) {
    responder(res, 1004, undefined, "Debes de enviar el IDVariante");
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
      .input("IDVariante", sql.Int, IDVariante)
      .execute("SP_Modulo_Inventario");

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
      .execute("SP_Modulo_Inventario");

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
  const body = (req.body ?? {}) as InventarioModel;
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
      .execute("SP_Modulo_Inventario");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
