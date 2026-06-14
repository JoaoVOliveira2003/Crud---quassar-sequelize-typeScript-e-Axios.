import { Router } from "express";
import { estadoController } from "../controllers/estadoController"

export const routerEstados = Router();

routerEstados.get("", async (req, res) => await estadoController.getEstados(req, res))
routerEstados.get("/estadoPorIdPais/:id", async (req, res) => await estadoController.getEstadosPorIdPais(req, res))

export default routerEstados;