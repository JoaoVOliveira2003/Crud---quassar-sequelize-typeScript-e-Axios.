import {Router} from "express";
import {paisController} from "../controllers/paisController";

export const routerPais = Router();

routerPais.get("", async (req, res) => await paisController.getPaises(req, res))

export default routerPais;