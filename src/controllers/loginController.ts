import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool, sql } from "../config/db";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    res
      .status(400)
      .json({ response: 0, message: "Usuario y contraseña requeridos" });
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
      res.status(401).json({ response: 0, message: "Credenciales inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user.IDPersona, roles: user.roles },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" },
    );

    const { passwordHash, ...safeUser } = user;

    res.json({
      response: 1,
      message: "Ingreso con exito",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ response: 0, message: "Error interno del servidor" });
  }
};
