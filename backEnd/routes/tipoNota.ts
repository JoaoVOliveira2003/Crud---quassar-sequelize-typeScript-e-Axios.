import { Router } from "express";
import { tipoNotaController } from "../controllers/tipoNotaController"

export const routerTipoNota = Router();

routerTipoNota.get("",async(req,res)=>await tipoNotaController.getTiposNota(req,res));

export default routerTipoNota;