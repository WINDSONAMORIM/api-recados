import express from "express";
import { routesApp } from "./config/routes";
import cors from "cors";

const allowedOrigins = ["*"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.use(express.json());

routesApp(app);

app.listen(process.env.PORT, () => console.log("Servidor iniciado"));
