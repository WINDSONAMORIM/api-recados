import { Request, Response } from "express";
import { listUsers } from "../../../database";
import { User } from "../../../models/user";

export class UserController {
  createUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const newUser = new User({ name, email, password });
      listUsers.push(newUser);
      return response
        .status(200)
        .json({ body: newUser, message: "User created successfully" });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  getUserAll(response: Response) {
    try {
      return response.status(200).json({ body: listUsers.map((user) => user) });
    } catch (error) {}
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
