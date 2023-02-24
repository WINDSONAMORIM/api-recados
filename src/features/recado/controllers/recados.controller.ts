import { Recado } from "../../../models/recado";
import { listUsers } from "../../../database";
import { User } from "../../../models/user";
import { Request, Response } from "express";

export class RecadosController {
  createRecado(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const { description, detail } = request.body;

      const newRecado = new Recado({ description, detail });

      const index = listUsers.findIndex((user) => user.id === idUser);

      listUsers[index].recados.push(newRecado);

      return response
        .status(200)
        .json({ body: newRecado, message: "message inserted successfully" });
    } catch (error) {}
  }
  getRecadoId(request: Request, response: Response) {
    try {
      const { idUser, idRecado } = request.params;
      const indexUser = listUsers.findIndex((user) => user.id === idUser);
      const indexRecado = listUsers[indexUser].recados.findIndex(
        (recado) => recado.id === idRecado
      );
      return response
        .status(200)
        .json({ body: listUsers[indexUser].recados[indexRecado] });
    } catch (error) {}
  }

  getRecadoAll(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const user = listUsers.find((user) => user.id === idUser);

      return response
        .status(200)
        .json({ body: user?.recados.map((recado) => recado) });
    } catch (error) {}
  }

  editRecado(request: Request, response: Response) {
    try {
      const { idUser, idRecado } = request.params;
      const { detail, description } = request.body;

      const indexUser = listUsers.findIndex((user) => user.id === idUser);
      const indexRecado = listUsers[indexUser].recados.findIndex(
        (recado) => recado.id === idRecado
      );

      const oldRecado = listUsers[indexUser].recados[indexRecado];

      listUsers[indexUser].recados[indexRecado].detail =
        detail ?? oldRecado.detail;
      listUsers[indexUser].recados[indexRecado].description =
        description ?? oldRecado.description;

      return response.status(200).json({
        body: listUsers[indexUser].recados[indexRecado],
        message: "Message changed successfully",
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }

  deleteRecado(request: Request, response: Response) {
    try {
      const { idUser, idRecado } = request.params;

      const indexUser = listUsers.findIndex((user) => user.id === idUser);
      const indexRecado = listUsers[indexUser].recados.findIndex(
        (recado) => recado.id === idRecado
      );

      listUsers[indexUser].recados.splice(indexRecado, 1);
    } catch (error) {}
  }
}
