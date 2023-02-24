import { NextFunction, Request, Response } from "express";
import { listUsers } from "../../../database";

export const validaExistRecado = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { idUser, idRecado } = request.params;
  const indexUser = listUsers.findIndex((user) => user.id === idUser);
  const recado = listUsers[indexUser].recados.some(
    (recado) => recado.id === idRecado
  );
  if (!recado) {
    return response.status(400).json({ message: "Message not found" });
  }
  return next();
};
