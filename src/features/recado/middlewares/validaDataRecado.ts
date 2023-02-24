import { NextFunction, Request, Response } from "express";
import * as EmailValidator from "email-validator";
import { z } from "zod";

export const validaDataRecado = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const msgFormatoInvalido = "Formato inválido";
  const msgCampoObrigatorio = "Campo obrigatório";

  const userScheme = z.object({
    detail: z.string({
      invalid_type_error: msgFormatoInvalido,
      required_error: msgCampoObrigatorio,
    }),
    description: z.string({
      invalid_type_error: msgFormatoInvalido,
      required_error: msgCampoObrigatorio,
    }),
  });

  try {
    const recadoBody = userScheme.parse(request.body);
    request.body = recadoBody;
    return next();
  } catch (error) {
    return response.status(400).send({
      message: error,
    });
  }
};
