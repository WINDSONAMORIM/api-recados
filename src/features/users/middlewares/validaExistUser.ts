import { NextFunction, Request, Response } from "express";
import { listUsers } from "../../../database";

export const validaExistUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { idUser } = request.params;
  const userExist = listUsers.some((user) => user.id === idUser);
  if (!userExist) {
    return response.status(400).json({ message: "User not found" });
  }
  return next();
};
