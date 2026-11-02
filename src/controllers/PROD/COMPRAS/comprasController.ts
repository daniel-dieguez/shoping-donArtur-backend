import { Request, Response } from "express";
import { getPool, sql } from "../../../config/db";
import { responder } from "../../../responses/codes";
import { ComprasModel } from "../../../models/PROD/COMPRAS/comprasModel";

export const store = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as ComprasModel;
  const IDUsuario = body.IDUsuario;
  const total = body.total;
  const subtotal = body.subtotal;
  const totalFinal = body.totalFinal;
  const numeroCompra = body.numeroCompra;
  const IDCupon = body.IDCupon;
  const descuento = body.descuento;
  const estadoPago = body.estadoPago;
  const usuario = body.usuario;

  if (!IDUsuario) {
    responder(res, 1004, undefined, "El usuario de la compra es obligatorio");
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
      .input("IDUsuario", sql.Int, IDUsuario)
      .input("total", sql.Decimal(10, 2), total)
      .input("subtotal", sql.Decimal(10, 2), subtotal)
      .input("totalFinal", sql.Decimal(10, 2), totalFinal)
      .input("numeroCompra", sql.VarChar(50), numeroCompra)
      .input("IDCupon", sql.Int, IDCupon)
      .input("descuento", sql.Decimal(10, 2), descuento)
      .input("estadoPago", sql.Int, estadoPago)
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Compras");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as ComprasModel;
  const id = body.id;
  const IDUsuario = body.IDUsuario;
  const total = body.total;
  const subtotal = body.subtotal;
  const totalFinal = body.totalFinal;
  const numeroCompra = body.numeroCompra;
  const IDCupon = body.IDCupon;
  const descuento = body.descuento;
  const fechaPago = body.fechaPago;
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
      .input("opcion", sql.Int, 2)
      .input("id", sql.Int, id)
      .input("IDUsuario", sql.Int, IDUsuario)
      .input("total", sql.Decimal(10, 2), total)
      .input("subtotal", sql.Decimal(10, 2), subtotal)
      .input("totalFinal", sql.Decimal(10, 2), totalFinal)
      .input("numeroCompra", sql.VarChar(50), numeroCompra)
      .input("IDCupon", sql.Int, IDCupon)
      .input("descuento", sql.Decimal(10, 2), descuento)
      .input(
        "fechaPago",
        sql.DateTime2,
        fechaPago ? new Date(fechaPago) : undefined,
      )
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Compras");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const estado = async (req: Request, res: Response): Promise<void> => {
  const body = (req.body ?? {}) as ComprasModel;
  const estado = body.estado;
  const estadoPago = body.estadoPago;
  const fechaPago = body.fechaPago;
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
      .input("id", sql.Int, id)
      .input("estado", sql.Int, estado)
      .input("estadoPago", sql.Int, estadoPago)
      .input(
        "fechaPago",
        sql.DateTime2,
        fechaPago ? new Date(fechaPago) : undefined,
      )
      .input("usuario", sql.VarChar(50), usuario)
      .execute("SP_Modulo_Compras");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};

export const all = async (req: Request, res: Response): Promise<void> => {
  // la paginación viene por query: /compras/all?pagina=1&registrosPorPagina=50
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
      .execute("SP_Modulo_Compras");

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
  const body = (req.body ?? {}) as ComprasModel;
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
      .execute("SP_Modulo_Compras");

    responder(res, 1, result.recordset);
  } catch (error) {
    console.error(error);
    responder(res, 1002);
  }
};
