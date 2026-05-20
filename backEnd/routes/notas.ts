import { Router } from "express";
import { notasController } from "../controllers/notasController";
import {validarTokenObrigatorioMiddleware} from '../middleware/validar-token-middleware'
import { validarBody } from '../middleware/validacao/validacao-middleware';

export const routerNotas = Router();

routerNotas.use(/*validarTokenObrigatorioMiddleware,*/validarBody)
routerNotas.get("/",async(req,res)=>notasController.getNotas(req,res));
routerNotas.post("/criarNota/", async (req, res) => await notasController.gravarNota(req, res));
routerNotas.delete("/deletarNota/:id",async (req, res) => await notasController.deletarNota(req, res));
routerNotas.put("/editarNota/:id",async (req, res) => await notasController.atualizarNota(req, res));
routerNotas.post("/filtroNotas/", async (req, res) => await notasController.getNotaFiltrado(req, res));

routerNotas.get("/countTiposFinalizada", async (req, res) => await notasController.getCountTipoFinalizada(res));
routerNotas.get("/countPrioridades", async (req, res) => await notasController.getCountPrioridades(res));
routerNotas.get("/countRadarPrioridades", async (req, res) => await notasController.countRadarPrioridades(res));

export default routerNotas;