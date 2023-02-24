import { Router } from "express";
import { validaExistUser } from "../users/middlewares/validaExistUser";
import { RecadosController } from "./controllers/recados.controller";
import { validaDataRecado } from "./middlewares/validaDataRecado";
import { validaExistRecado } from "./middlewares/validaExistRecado";

export const recadoRoutes = (router: Router) => {
  const recadoController = new RecadosController();

  router.post(
    "/users/:idUser/recado",
    validaExistUser,
    validaDataRecado,
    recadoController.createRecado
  );

  router.get(
    "/users/:idUser/recado/:idRecado",
    validaExistUser,
    validaExistRecado,
    recadoController.getRecadoId
  );

  router.get(
    "/users/:idUser/recado",
    validaExistUser,
    recadoController.getRecadoAll
  );

  router.put(
    "/users/:idUser/recado/:idRecado",
    validaExistUser,
    recadoController.editRecado
  );

  router.delete(
    "/users/:idUser/recado:idRecado",
    validaExistUser,
    validaExistRecado,
    recadoController.deleteRecado
  );
};
