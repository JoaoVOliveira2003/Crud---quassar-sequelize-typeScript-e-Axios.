import { Router } from "express";
import { notasController } from "../controllers/notasController";

export const routerNotas = Router();

routerNotas.get("/",async(req,res)=>notasController.getNotas(req,res));
routerNotas.post("/criarNota/", async (req, res) => await notasController.gravarNota(req, res));
routerNotas.delete("/deletarNota/:id",async (req, res) => await notasController.deletarNota(req, res));
routerNotas.put("/editarNota/:id",async (req, res) => await notasController.atualizarNota(req, res));
routerNotas.get("/filtroNota/", async (req, res) => await notasController.getNotaFiltrado(req, res));


export default routerNotas;