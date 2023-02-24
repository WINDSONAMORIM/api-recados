import { NextFunction, Request, Response } from "express";
import * as EmailValidator from "email-validator";
import { z } from "zod";

export const validaDataUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const msgFormatoInvalido = "Formato inválido";
  const msgCampoObrigatorio = "Campo obrigatório";

  const userScheme = z.object({
    name: z.string({
      invalid_type_error: msgFormatoInvalido,
      required_error: msgCampoObrigatorio,
    }),
    email: z
      .string({
        invalid_type_error: msgFormatoInvalido,
        required_error: msgCampoObrigatorio,
      })
      .refine((val) => EmailValidator.validate(val), {
        message: "E-mail inválido, Favor forneça um e-mail válido",
      }),
    password: z.string({
      invalid_type_error: msgFormatoInvalido,
      required_error: msgCampoObrigatorio,
    }),
  });

  try {
    const userBody = userScheme.parse(request.body);
    request.body = userBody;
    return next();
  } catch (error) {
    return response.status(400).send({
      message: error,
    });
  }
};
