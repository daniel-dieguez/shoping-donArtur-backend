import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { RolesModel } from "../../../models/ADM/ROLES/rolesModels";


// siempre colocaremos primero el store, update, estado, select -> misma arquitecura que la del sp mayor facilidad
export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as RolesModel;
  const nombre = body.nombre?.trim();
  const rol = body.rol?.trim();
  const usuario = body.usuario;

  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
    return;
  } if (!rol) {
    responder(res, 1004, undefined, "El rol es obligatorio");
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
      .input("rol", sql.VarChar, rol)
      .input("usuario", sql.Int, usuario)
      .execute("SP_Modulo_Roles");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as RolesModel;
  const nombre = body.nombre?.trim();
  const rol = body.rol?.trim();
  const id = body.id;
  const usuario = body.usuario;

  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
    return;
  }
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
      .input("nombre", sql.VarChar, nombre)
      .input("rol", sql.VarChar, rol)
      .input("usuario", sql.Int, usuario)
      .input("id", sql.Int, id)
      .execute("SP_Modulo_Roles");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as RolesModel;
  const estado = body.estado;
  const id = body.id;
  const usuario = body.usuario;

  
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
      .input("estado", sql.Bit, estado)
      .input("id", sql.Int, id)
      .input("usuario", sql.Int, usuario)
      .execute("SP_Modulo_Roles");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};


//-------------- aqui lo demas

export const all = async (req: Request, res: Response): Promise<void> => {
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
      .execute("SP_Modulo_Roles");

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
  const body = (req.body ?? {}) as RolesModel;
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
      .execute("SP_Modulo_Roles");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};



