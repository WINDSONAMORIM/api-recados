import express, { Application, Request, Response } from "express";
import { recadoRoutes } from "../features/recado/recados.routes";
import { userRoutes } from "../features/users/users.routes";
import { initialPage } from "./initalPage";

const routesApp = (app: Application) => {
  const router = express.Router();

  app.use("/", router);

  router.get("/", (request: Request, response: Response) =>
    response.send(initialPage)
  );

  userRoutes(router);
  recadoRoutes(router);
};

export { routesApp };
