import { Recado } from "../../../models/recado";
import { listUsers } from "../../../database";
import { User } from "../../../models/user";
import { query, Request, Response } from "express";
import { ResponseAPI } from "../../../types";
import { send } from "process";

export class RecadosController {
  createRecado(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const { description, detail, archive } = request.body;
      const newRecado = new Recado({ description, detail, archive });
      const index = listUsers.findIndex((user) => user.id === idUser);
      listUsers[index].recados.push(newRecado);

      const resposta: ResponseAPI = {
        success: true,
        message: "Recado cadastrado com sucesso.",
        data: newRecado,
      };

      return response.status(200).send(resposta);
    } catch (error) {}
  }

  getRecadoId(request: Request, response: Response) {
    try {
      const { idUser, idRecado } = request.params;
      const indexUser = listUsers.findIndex((user) => user.id === idUser);
      const indexRecado = listUsers[indexUser].recados.findIndex(
        (recado) => recado.id === idRecado
      );

      const resposta: ResponseAPI = {
        success: true,
        message: "Recado buscado com sucesso.",
        data: listUsers[indexUser].recados[indexRecado],
      };

      return response.status(200).send(resposta);
    } catch (error) {}
  }

  getRecadoAll(request: Request, response: Response) {
    try {
      const { idUser } = request.params;
      const { archive } = request.query;
      const indexUser = listUsers.findIndex((user) => user.id === idUser);
      const recadosFilter = listUsers[indexUser].recados.filter((recado) => {
        if (archive) {
          return recado.archive === Boolean(archive === "true" ? true : false);
        }
        return true;
      });

      const resposta: ResponseAPI = {
        success: true,
        message: "Recados buscados com sucesso.",
        data: recadosFilter,
      };

      return response.status(200).send(resposta);
    } catch (error) {}
  }

  editRecado(request: Request, response: Response) {
    try {
      const { idUser, idRecado } = request.params;
      const { detail, description, archive } = request.body;

      const indexUser = listUsers.findIndex((user) => user.id === idUser);
      const indexRecado = listUsers[indexUser].recados.findIndex(
        (recado) => recado.id === idRecado
      );

      const oldRecado = listUsers[indexUser].recados[indexRecado];

      listUsers[indexUser].recados[indexRecado].detail =
        detail ?? oldRecado.detail;
      listUsers[indexUser].recados[indexRecado].description =
        description ?? oldRecado.description;
      listUsers[indexUser].recados[indexRecado].archive =
        archive ?? oldRecado.archive;

      const resposta: ResponseAPI = {
        success: true,
        message: "Recado editado com sucesso.",
        data: listUsers[indexUser].recados[indexRecado],
      };

      return response.status(200).json(resposta);
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

      const resposta: ResponseAPI = {
        success: true,
        message: "Recado deletado com sucesso.",
        data: listUsers[indexUser].recados[indexRecado],
      };
      return response.status(200).json(resposta);
    } catch (error) {
      return response.status(400).send({
        message: error,
      });
    }
  }
}
