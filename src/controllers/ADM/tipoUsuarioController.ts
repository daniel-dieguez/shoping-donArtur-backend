import { Request, Response } from "express";
import { getPool, sql } from "../../config/db";
import { responder } from "../../responses/codes";
import { TipoUsuarioModel } from "../../models/ADM/tipoUsuarioModel";

//  ejecuta el SP con la opción 4 para las dos consultas
const consultar = async (res: Response, id: number | null): Promise<void> => {
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
      .input("id", sql.Int, id)
      .execute("SP_Modulo_TipoUsuario");

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

// post para el all pa
export const tipoUsuarioAll = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  await consultar(res, null);
};

// post para el one
export const tipoUsuarioOne = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = (req.body ?? {}) as TipoUsuarioModel;
  const id = Number(body.id);

  if (
    body.id === undefined ||
    body.id === null ||
    !Number.isInteger(id) ||
    id <= 0
  ) {
    responder(
      res,
      1004,
      undefined,
      "El id es obligatorio y debe ser un número entero positivo",
    );
    return;
  }

  await consultar(res, id);
};

export const obtenerTipoUsuario = async (
  _req: Request,
  res: Response,
): Promise<void> => {
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
      .execute("SP_Modulo_TipoUsuario");

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

export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as TipoUsuarioModel;
  const nombre = body.nombre?.trim();
  const usuario = body.usuario?.trim();

  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
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
      .input("nombre", sql.VarChar, nombre)
      .input("usuario", sql.VarChar, usuario)
      .execute("SP_Modulo_TipoUsuario");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as TipoUsuarioModel;
  const nombre = body.nombre?.trim();
  const id = body.id;
  const usuario = body.usuario?.trim();

  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
    return;
  }
  if(!id){
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
      .input("nombre", sql.VarChar, nombre)
      .input("usuario", sql.VarChar, usuario)
      .input("id", sql.Int, id)
      .execute("SP_Modulo_TipoUsuario");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

