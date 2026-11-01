import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { UsuarioModel } from "../../../models/ADM/USUARIO/usuarioModel";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BCRYPT_REGEX = /^\$2[aby]\$\d{2}\$.{53}$/;


export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as UsuarioModel;
  const nombre = body.nombre?.trim();
  const correo = body.correo?.trim();
  const idDepartamento = body.idDepartamento;
  const idZona = body.idZona;
  const direccion = body.direccion?.trim();
  const roles = body.roles?.trim();
  const passwords = body.passwords; // ya viene cifrado por el middleware
  const usuario = body.usuario;

  if (!nombre) {
    responder(res, 1004, undefined, "El nombre es obligatorio");
    return;
  }
  if (nombre.length > 100) {
    responder(
      res,
      1004,
      undefined,
      "El nombre no puede tener más de 100 caracteres",
    );
    return;
  }
  if (!correo) {
    responder(res, 1004, undefined, "El correo es obligatorio");
    return;
  }
  if (correo.length > 100 || !EMAIL_REGEX.test(correo)) {
    responder(res, 1004, undefined, "El correo no es válido");
    return;
  }
  if (!idDepartamento) {
    responder(res, 1004, undefined, "El departamento es obligatorio");
    return;
  }
  if (!idZona) {
    responder(res, 1004, undefined, "La zona es obligatoria");
    return;
  }
  if (direccion && direccion.length > 100) {
    responder(
      res,
      1004,
      undefined,
      "La dirección no puede tener más de 100 caracteres",
    );
    return;
  }
  if (!roles) {
    responder(res, 1004, undefined, "El rol es obligatorio");
    return;
  }
  if (roles.length > 128) {
    responder(
      res,
      1004,
      undefined,
      "Los roles no pueden tener más de 128 caracteres",
    );
    return;
  }
  // seguridad: si por error la ruta no usa el middleware, nunca guardamos texto plano
  if (!passwords || !BCRYPT_REGEX.test(passwords)) {
    console.error(
      "store usuario: la contraseña no llegó cifrada, revisa encriptarPassword en la ruta",
    );
    responder(res, 1002);
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
      .input("nombre", sql.VarChar(100), nombre)
      .input("correo", sql.VarChar(100), correo)
      .input("idDepartamento", sql.Int, idDepartamento)
      .input("idZona", sql.Int, idZona)
      .input("direccion", sql.VarChar(100), direccion ?? null)
      .input("roles", sql.VarChar(128), roles)
      .input("passwords", sql.VarChar(255), passwords)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Persona");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as UsuarioModel;
  const id = body.id;
  // en el SP el update usa COALESCE: lo que no se envíe conserva su valor actual
  const nombre = body.nombre?.trim() || undefined;
  const correo = body.correo?.trim() || undefined;
  const idDepartamento = body.idDepartamento;
  const idZona = body.idZona;
  const direccion = body.direccion?.trim() || undefined;
  const roles = body.roles?.trim() || undefined;
  const usuario = body.usuario;

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar un id");
    return;
  }
  if (
    nombre === undefined &&
    correo === undefined &&
    !idDepartamento &&
    !idZona &&
    direccion === undefined &&
    roles === undefined
  ) {
    responder(
      res,
      1004,
      undefined,
      "Debes de enviar al menos un campo a actualizar",
    );
    return;
  }
  if (nombre && nombre.length > 100) {
    responder(
      res,
      1004,
      undefined,
      "El nombre no puede tener más de 100 caracteres",
    );
    return;
  }
  if (correo && (correo.length > 100 || !EMAIL_REGEX.test(correo))) {
    responder(res, 1004, undefined, "El correo no es válido");
    return;
  }
  if (direccion && direccion.length > 100) {
    responder(
      res,
      1004,
      undefined,
      "La dirección no puede tener más de 100 caracteres",
    );
    return;
  }
  if (roles && roles.length > 128) {
    responder(
      res,
      1004,
      undefined,
      "Los roles no pueden tener más de 128 caracteres",
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
      .input("nombre", sql.VarChar(100), nombre ?? null)
      .input("correo", sql.VarChar(100), correo ?? null)
      .input("idDepartamento", sql.Int, idDepartamento ?? null)
      .input("idZona", sql.Int, idZona ?? null)
      .input("direccion", sql.VarChar(100), direccion ?? null)
      .input("roles", sql.VarChar(128), roles ?? null)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Persona");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as UsuarioModel;
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
      .execute("SP_Modulo_Persona");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

//-------------- aqui lo demas

export const all = async (req: Request, res: Response): Promise<void> => {
  // la paginación viene por query: /usuarios/all?pagina=1&registrosPorPagina=50
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
      .execute("SP_Modulo_Persona");

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
  const body = (req.body ?? {}) as UsuarioModel;
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
      .execute("SP_Modulo_Persona");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
