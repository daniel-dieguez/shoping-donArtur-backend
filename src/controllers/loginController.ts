import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool, sql } from "../config/db";
import {
  ok,
  badRequest,
  unauthorized,
  serverError,
} from "../responses/api.response";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { usuario, password } = req.body ?? {};

  const errors: Record<string, string> = {};
  if (!usuario) errors.usuario = "El usuario es obligatorio";
  if (!password) errors.password = "La contraseña es obligatoria";

  if (Object.keys(errors).length > 0) {
    badRequest(res, "Datos inválidos", errors);
    return;
  }

  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("opcion", sql.Int, 1)
      .input("usuario", sql.VarChar(100), usuario)
      .execute("SP_Modulo_Login");

    const user = result.recordset[0];

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      unauthorized(res, "Credenciales inválidas");
      return;
    }

    const token = jwt.sign(
      { id: user.IDPersona, roles: user.roles },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" },
    );

    const { passwordHash, ...safeUser } = user;

    ok(res, "Ingreso con exito", { token, user: safeUser });
  } catch (error) {
    console.error(error);
    serverError(res);
  }
};
