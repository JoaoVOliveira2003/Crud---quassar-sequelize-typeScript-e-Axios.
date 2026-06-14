import {Router} from "express";
import {cidadeController} from "../controllers/cidadeController";

export const routerCidades = Router();

routerCidades.get("", async (req, res) => await cidadeController.getCidades(req, res))
routerCidades.get("/cidadePorIdEstado/:id", async (req, res) => await cidadeController.getCidadesPorIdEstado(req, res))

export default routerCidades;