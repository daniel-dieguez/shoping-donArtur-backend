import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { badRequest } from "../responses/api.response";

export const validar =
  (schema: ZodType, source: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errors[issue.path.join(".") || "general"] = issue.message;
      }
      badRequest(res, "Datos inválidos", errors);
      return;
    }

    res.locals.data = result.data; // aqui es donde hare que se vladine los datos
    next();
  };
