import express from "express";
import { routesApp } from "./config/routes";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

routesApp(app);

app.listen(process.env.PORT, () => console.log("Servidor iniciado"));
