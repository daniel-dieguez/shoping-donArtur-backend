import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { UbicacionModel } from "../../../models/ADM/UBICACION/ubicacionModel";

// este SP no tiene store, update ni estado: solo consultas para selects (id, label)

//-------------- aqui lo demas

export const departamentos = async (
  req: Request,
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
      .input("opcion", sql.Int, 1)
      .execute("SP_Modulo_PAIS");

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

export const municipios = async (
  req: Request,
  res: Response,
): Promise<void> => {

  const id = Number(req.query.id ?? (req.body as UbicacionModel | undefined)?.id);

  if (!id) {
    responder(res, 1004, undefined, "Debes de enviar el id del departamento");
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
      .execute("SP_Modulo_PAIS");

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
