import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { responder } from "./codes";

const SALT_ROUNDS = 10;

// Cifra req.body.passwords ANTES de llegar al controller.
// Úsalo solo en las rutas que reciben una contraseña (ej. crear usuario).
export const encriptarPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const password = req.body?.passwords;

  if (!password || typeof password !== "string") {
    responder(res, 1004, undefined, "La contraseña es obligatoria");
    return;
  }
  if (password.length < 8) {
    responder(
      res,
      1004,
      undefined,
      "La contraseña debe tener al menos 8 caracteres",
    );
    return;
  }
  // bcrypt solo toma en cuenta los primeros 72 bytes
  if (Buffer.byteLength(password, "utf8") > 72) {
    responder(
      res,
      1004,
      undefined,
      "La contraseña no puede superar los 72 caracteres",
    );
    return;
  }

  try {
    req.body.passwords = await bcrypt.hash(password, SALT_ROUNDS);
    next();
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
