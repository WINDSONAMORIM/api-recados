import { Request, Response } from "express";
import { listUsers } from "../../../database";
import { User } from "../../../models/user";
import { ResponseAPI } from "../../../types";

export class UserController {
  createUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const newUser = new User({ name, email, password });

      const resposta: ResponseAPI = {
        success: true,
        message: "Usuário cadastrado com sucesso.",
        data: listUsers,
      };

      listUsers.push(newUser);
      return response.status(200).send(resposta);
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  getUserAll(request: Request, response: Response) {
    try {
      const resposta: ResponseAPI = {
        success: true,
        message: "Usuários buscados com sucesso.",
        data: listUsers,
      };
      return response.status(200).send(resposta);
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  getUserId(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const userFiltrado = listUsers.find((user) => user.id === idUser) as User;
      return response
        .status(200)
        .json({ body: userFiltrado, message: "user found successfully" });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  editUser(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const { name, email, password } = request.body;
      const index = listUsers.findIndex((user) => user.id === idUser);
      listUsers[index].name = name ?? listUsers[index].name;
      listUsers[index].email = email ?? listUsers[index].email;
      listUsers[index].password = password ?? listUsers[index].password;
      return response.status(200).json({ body: listUsers[index] });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  deleteUser(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const index = listUsers.findIndex((user) => user.id === idUser);
      listUsers.splice(index, 1);
      return response
        .status(200)
        .json({ body: index, message: "user deleted successfully" });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }
}
