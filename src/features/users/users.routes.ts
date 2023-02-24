import { Router } from "express";
import { UserController } from "./controllers";

import { validaDataUser } from "./middlewares";
import { validaExistUser } from "./middlewares/validaExistUser";

export const userRoutes = (router: Router) => {
  const userController = new UserController();

  router.post("/users", validaDataUser, userController.createUser);

  router.get("/users/:idUser", validaExistUser, userController.getUserId);

  router.put("/users/:idUser", validaExistUser, userController.editUser);

  router.delete("/users/:idUser", validaExistUser, userController.deleteUser);
};
