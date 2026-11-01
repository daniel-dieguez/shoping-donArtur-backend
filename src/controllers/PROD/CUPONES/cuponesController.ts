import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { CuponesModel } from "../../../models/PROD/CUPONES/cuponesModel";

export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CuponesModel;
  const IDCataCup = body.IDCataCup;
  const codigo = body.codigo?.trim();
  const usuario = body.usuario;

  if (!IDCataCup) {
    responder(res, 1004, undefined, "El tipo de cupón es obligatorio");
    return;
  }
  if (!codigo) {
    responder(res, 1004, undefined, "El código es obligatorio");
    return;
  }
  if (codigo.length > 20) {
    responder(
      res,
      1004,
      undefined,
      "El código no puede tener más de 20 caracteres",
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
      .input("IDCataCup", sql.Int, IDCataCup)
      .input("codigo", sql.VarChar(20), codigo)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CuponesModel;
  const id = body.id;

  const IDCataCup = body.IDCataCup;
  const codigo = body.codigo?.trim() || undefined;
  const usuario = body.usuario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (!IDCataCup && codigo === undefined) {
    responder(
      res,
      1004,
      undefined,
      "Debes de enviar el tipo de cupón o el código a actualizar",
    );
    return;
  }
  if (codigo && codigo.length > 20) {
    responder(
      res,
      1004,
      undefined,
      "El código no puede tener más de 20 caracteres",
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
      .input("id", sql.Int, id)
      .input("IDCataCup", sql.Int, IDCataCup ?? null)
      .input("codigo", sql.VarChar(20), codigo ?? null)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as CuponesModel;
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
      .execute("SP_Modulo_Cupones");

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
      .execute("SP_Modulo_Cupones");

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
  const body = (req.body ?? {}) as CuponesModel;
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
      .execute("SP_Modulo_Cupones");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
